const express = require("express");
const Conversation = require("../model/Conversation");
const router = express.Router();

router.get('/list', async (req, res) => {
	try {
		const conversation = await Conversation.findAll();
		return res.send(conversation);
	} catch (e) {
		console.log(e);
		return res.status(400).send("Something went wrong");
	}
});

router.post('/', async (req, res) => {
	try {
		const conversation = await Conversation.create({
			user1: req.body.user1,
			user2: req.body.user2,
		});
		return res.status(200).send(conversation);
	} catch (e) {
		console.log(e);
		return res.status(400).send("User not present");
	}
});

router.get('/', async (req, res) => {
	try {
		if (!req.query.user1 || !req.query.user2) {
			return res.status(400).send("Missing required params");
		}
		let conversation = await Conversation.findOne({
			where: {
				user1: req.query.user1,
				user2: req.query.user2,
			},
		});
		if (!conversation) {
			conversation = await Conversation.findOne({
				where: {
					user1: req.query.user2,
					user2: req.query.user1,
				},
			});

			if (!conversation) {
				return res.status(404).send("No conversations yet");
			}
		}

		return res.status(200).send(conversation);
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
		const conversation = await Conversation.findByPk(req.query.id);
		if (!conversation)
			return res.status(404).send("conversation not found");

		await conversation.update({
			isDeleted: true,
		});
		return res.status(200).send(conversation);
	} catch (e) {
		console.log(e);
		return res.status(400).send("Something went wrong");
	}
});

module.exports = router;