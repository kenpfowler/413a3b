const Conversation = require("./conversation");
const User = require("./user");
const UserConversation = require("./userconversation");
const Message = require("./message");

// associations
Conversation.belongsToMany(User, {
  through: UserConversation,
  as: "users",
  foreignKey: "id",
});
User.belongsToMany(Conversation, {
  through: UserConversation,
  foreignKey: "user_id",
});

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
  UserConversation,
};
