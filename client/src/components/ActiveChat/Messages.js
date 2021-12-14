import React from "react";
import { Avatar, Box, makeStyles } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  avatar: {
    height: 25,
    width: 25,
  },
}));

const Messages = (props) => {
  const { messages, otherUser, userId, myLastMessageId } = props;
  const classes = useStyles();

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <Box className={classes.root}>
            <SenderBubble key={message.id} text={message.text} time={time} />
            {message.id === myLastMessageId && message.isRead && (
              <Avatar
                className={classes.avatar}
                src={otherUser.photoUrl}
                alt={otherUser.username}
              />
            )}
          </Box>
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
