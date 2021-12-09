import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
    fontFamily: "Open Sans",
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  unreadPreviewText: {
    fontSize: 12,
    color: "#000000",
    letterSpacing: -0.17,
    fontWeight: "bold",
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  notificationBubble: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    backgroundColor: "#3F92FF",
    minWidth: "20px",
    height: "20px",
    position: "absolute",
    left: "86.67%",
    right: "6.67%",
    top: "37.5%",
    bottom: "37.5%",
  },

  largeNotificationBubble: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    backgroundColor: "#3F92FF",
    minWidth: "20px",
    width: "30px",
    height: "20px",
    position: "absolute",
    left: "86.67%",
    right: "6.67%",
    top: "37.5%",
    bottom: "37.5%",
  },

  notificationBubbleText: {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "10px",
    color: "#FFFFFF",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, messages } = conversation;
  let unreadMessages;

  if (conversation.messages.length !== 0) {
    unreadMessages = messages
      .map((message) => {
        if (message.senderId === conversation.otherUser.id) {
          return message.isUnread ? 1 : 0;
        } else {
          return 0;
        }
      })
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  } else {
    unreadMessages = [];
  }

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            unreadMessages ? classes.unreadPreviewText : classes.previewText
          }
        >
          {latestMessageText}
        </Typography>
      </Box>
      {unreadMessages > 0 ? (
        <div
          className={
            unreadMessages > 9
              ? classes.largeNotificationBubble
              : classes.notificationBubble
          }
        >
          <Typography className={classes.notificationBubbleText}>
            {unreadMessages}
          </Typography>
        </div>
      ) : null}
    </Box>
  );
};

export default ChatContent;
