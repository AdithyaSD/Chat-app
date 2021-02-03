const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Conversation = sequelize.define('conversation', {
	message: {
	  type: Sequelize.STRING,
	},
	receiver: {
		type: Sequelize.INTEGER,
	},
	sender: {
		type: Sequelize.INTEGER,
	},
});

module.exports = User;