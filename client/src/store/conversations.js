import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  updateisReadMessages,
  updateIsUnreadCount,
  setLastSentMessage,
  updateNotificationReadMessages,
} from "./utils/reducerFunctions";

// ACTIONS

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SET_MESSAGE";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";
const ADD_CONVERSATION = "ADD_CONVERSATION";
const VIEW_UNREAD_MESSAGES = "VIEW_UNREAD_MESSAGES";
const SET_IS_UNREAD_COUNT = "SET_IS_UNREAD_COUNT";
const SET_LAST_SENT_MESSAGE = "SET_LAST_SENT_MESSAGE";
const NOTIFY_VIEWED_MESSAGES = "NOTIFY_VIEWED_MESSAGES";

// ACTION CREATORS

export const getLastSentMessage = (lastMessageId, conversationId) => {
  return {
    type: SET_LAST_SENT_MESSAGE,
    payload: { lastMessageId, conversationId },
  };
};

export const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations,
  };
};

export const setNewMessage = (message, sender) => {
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null },
  };
};

export const setIsUnreadCount = (conversationId, isUnreadCount) => {
  return {
    type: SET_IS_UNREAD_COUNT,
    payload: { conversationId: conversationId, isUnreadCount: isUnreadCount },
  };
};

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = (users) => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};

export const viewUnreadMessages = (viewedMessages) => {
  return {
    type: VIEW_UNREAD_MESSAGES,
    payload: viewedMessages,
  };
};

export const notifyViewedMessages = (viewed) => {
  return {
    type: NOTIFY_VIEWED_MESSAGES,
    payload: viewed.updated,
  };
};

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    case NOTIFY_VIEWED_MESSAGES:
      return updateNotificationReadMessages(state, action.payload);
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case VIEW_UNREAD_MESSAGES:
      return updateisReadMessages(state, action.payload);
    case SET_LAST_SENT_MESSAGE:
      return setLastSentMessage(state, action.payload);
    case SET_IS_UNREAD_COUNT:
      return updateIsUnreadCount(state, action.payload);
    case ADD_ONLINE_USER:
      return addOnlineUserToStore(state, action.id);
    case REMOVE_OFFLINE_USER:
      return removeOfflineUserFromStore(state, action.id);
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(
        state,
        action.payload.recipientId,
        action.payload.newMessage
      );
    default:
      return state;
  }
};

export default reducer;
