const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender, isRead } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({
        senderId,
        text,
        conversationId,
        isRead,
      });

      const isUnreadCount = await Message.count({
        where: {
          senderId: { [Op.not]: recipientId },
          conversationId: { [Op.eq]: conversationId },
          isRead: { [Op.eq]: false },
        },
      });
      return res.json({
        message: message,
        sender: sender,
        isUnreadCount: isUnreadCount,
      });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      isRead,
    });

    const isUnreadCount = await Message.count({
      where: {
        senderId: { [Op.not]: recipientId },
        conversationId: { [Op.eq]: conversationId },
        isRead: { [Op.eq]: false },
      },
    });

    res.json({
      message: message,
      sender: sender,
      isUnreadCount: isUnreadCount,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { otherUserId, conversationId } = req.body;

    if (!conversationId) {
      return res.sendStatus(404);
    }

    await Message.update(
      { isRead: true },
      {
        where: { senderId: otherUserId, conversationId: conversationId },
      }
    );

    const updated = await Message.findAll({
      where: { conversationId: conversationId },
      order: [["createdAt", "ASC"]],
    });

    const isUnreadCount = await Message.count({
      where: {
        senderId: { [Op.eq]: otherUserId },
        conversationId: { [Op.eq]: conversationId },
        isRead: { [Op.eq]: false },
      },
    });

    res.json({ updated: updated, isUnreadCount: isUnreadCount });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
