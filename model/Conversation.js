const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Conversation = sequelize.define('conversation', {
	user1: {
	    type: Sequelize.INTEGER,
	    allowNull: false,
	},
	user2: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	isDeleted: {
		type: Sequelize.BOOLEAN,
	},
});

module.exports = Conversation;