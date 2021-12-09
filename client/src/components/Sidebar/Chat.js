import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { viewUnreadMessagesAsync } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, viewUnreadMessagesAsync } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    const { id } = conversation.otherUser;
    const body = {
      otherUserId: id,
      conversationId: conversation.id,
    };
    await viewUnreadMessagesAsync(body, conversation.otherUser.username);
  };

  return (
    <Box
      onClick={async () => await handleClick(conversation)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewUnreadMessagesAsync: (body, id) => {
      dispatch(viewUnreadMessagesAsync(body, id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
