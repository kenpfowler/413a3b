import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
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
          return message.isRead ? 0 : 1;
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
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        {unreadMessages.length !== 0 && (
          <Badge badgeContent={unreadMessages} color="primary" />
        )}
      </Box>
    </Box>
  );
};

export default ChatContent;
