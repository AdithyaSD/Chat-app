const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define('user', {
	name: {
	  type: Sequelize.STRING,
	  allowNull: false,
	},
	isDeleted: {
		type: Sequelize.BOOLEAN,
	}
});

module.exports = User;