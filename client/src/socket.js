import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setIsUnreadCount,
} from "./store/conversations";

import { viewMessages } from "./store/utils/thunkCreators";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", async (data) => {
    const activeConversation = store.getState().activeConversation;
    let otherUserName;
    let currentConvo;

    if (activeConversation) {
      otherUserName = store
        .getState()
        .conversations.find(
          (convo) => convo.id === data.message.conversationId
        );

      if (otherUserName) {
        otherUserName = otherUserName.otherUser.username;
      }

      currentConvo = store
        .getState()
        .conversations.find(
          (convo) => convo.id === data.message.conversationId
        );
    } else {
      otherUserName = null;
      currentConvo = null;
    }

    if (otherUserName === activeConversation) {
      const body = {
        otherUserId: currentConvo.otherUser.id,
        conversationId: data.message.id,
      };
      data.isRead = true;
      store.dispatch(setNewMessage(data.message, data.sender));
    } else {
      store.dispatch(setNewMessage(data.message, data.sender));
    }
  });

  socket.on("update-unread-messages", async (data) => {
    const activeConversation = store.getState().activeConversation;
    let otherUserName;
    let currentConvo;
    if (activeConversation) {
      otherUserName = store
        .getState()
        .conversations.find((convo) => convo.id === data.conversationId);

      if (otherUserName) {
        otherUserName = otherUserName.otherUser.username;
      }

      currentConvo = store
        .getState()
        .conversations.find((convo) => convo.id === data.conversationId);
    } else {
      otherUserName = null;
      currentConvo = null;
    }

    if (activeConversation === otherUserName) {
      const body = {
        otherUserId: currentConvo.otherUser.id,
        conversationId: data.conversationId,
      };
      let viewed = await viewMessages(body);
      store.dispatch(
        setIsUnreadCount(data.conversationId, viewed.isUnreadCount)
      );
    } else {
      store.dispatch(setIsUnreadCount(data.conversationId, data.isUnreadCount));
    }
  });
});

export default socket;
