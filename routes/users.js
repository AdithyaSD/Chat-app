const express = require("express");
const User = require("../model/User");
const router = express.Router();

router.get('/list', async (req, res) => {
	try {
		const user = await User.findAll();
		return res.send(user);
	} catch (e) {
		console.log(e);
		return res.status(400).send("Something went wrong");
	}
});

router.post('/', async (req, res) => {
	try {
		const user = await User.create({
			name: req.body.name,
		});
		return res.status(200).send(user);
	} catch (e) {
		console.log(e);
		return res.status(400).send("User name already exists");
	}
});

router.get('/', async (req, res) => {
	try {
		if (!req.query.name) {
			return res.status(400).send("Missing required params");
		}
		const user = await User.findOne({
			where: {
				name: req.query.name,
			},
		});
		if (!user)
			return res.status(404).send("User not found");

		return res.status(200).send(user);
	} catch (e) {
		console.log(e);
		return res.status(400).send("Something went wrong");
	}
});

router.delete('/', async (req, res) => {
	try {
		if (!req.query.id) {
			return res.status(400).send("Missing required params");
		}
		const user = await User.findByPk(req.query.id);
		if (!user)
			return res.status(404).send("User not found");

		await user.update({
			isDeleted: true,
		});
		return res.status(200).send(user);
	} catch (e) {
		console.log(e);
		return res.status(400).send("Something went wrong");
	}
});

module.exports = router;