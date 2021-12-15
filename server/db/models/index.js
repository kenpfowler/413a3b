const Conversation = require("./conversation");
const User = require("./user");
// const UserConversatinos = require("./userconversation");
const Message = require("./message");

// associations
// Conversation.belongsToMany(User, {
//   through: UserConversation,
//   as: "users",
//   foreignKey: "id",
// });
// User.belongsToMany(Conversation, {
//   through: UserConversation,
//   foreignKey: "user_id",
// });

User.hasMany(Conversation); // old assocation to be removed
Conversation.belongsTo(User, { as: "user1" }); // old assocation to be removed
Conversation.belongsTo(User, { as: "user2" }); // old assocation to be removed
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
  // UserConversations
};
