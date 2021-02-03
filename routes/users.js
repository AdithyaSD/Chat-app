const express = require("express");
const User = require("../model/User");
const router = express.Router();

router.get('/', async (req, res) => {
	const user = await User.findAll();
	res.send(user);
});

module.exports = router;