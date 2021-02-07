const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Message = sequelize.define('message', {
	sender: {
	    type: Sequelize.INTEGER,
	    allowNull: false,
	},
	reciever: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	isDeleted: {
		type: Sequelize.BOOLEAN,
	},
	message: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	conversation: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	isUpdated: {
		type: Sequelize.BOOLEAN,
	}
});

module.exports = Message;