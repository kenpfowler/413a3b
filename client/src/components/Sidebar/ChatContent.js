import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
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
  const { latestMessageText, otherUser, isUnreadCount } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            isUnreadCount ? classes.unreadPreviewText : classes.previewText
          }
        >
          {latestMessageText}
        </Typography>
      </Box>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Badge
          badgeContent={isUnreadCount}
          color="primary"
          style={{ marginRight: "40px" }}
        />
      </Box>
    </Box>
  );
};

export default ChatContent;
