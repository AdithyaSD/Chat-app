const express = require("express");
const Message = require("../model/Message");
const router = express.Router();

router.get('/list', async (req, res) => {
	try {
		const message = await Message.findAll();
		return res.send(message);
	} catch (e) {
		console.log(e);
		return res.status(400).send("Something went wrong");
	}
});

router.post('/', async (req, res) => {
	try {
		const message = await Message.create({
			sender: req.body.sender,
			reciever: req.body.reciever,
			message: req.body.message,
			conversation: req.body.conversation,
		});
		return res.status(200).send(message);
	} catch (e) {
		console.log(e);
		return res.status(400).send("User not present");
	}
});

router.delete('/', async (req, res) => {
	try {
		if (!req.query.id) {
			return res.status(400).send("Missing required params");
		}
		const message = await Message.findByPk(req.query.id);
		if (!message)
			return res.status(404).send("message not found");

		await message.update({
			isDeleted: true,
		});
		return res.status(200).send(message);
	} catch (e) {
		console.log(e);
		return res.status(400).send("Something went wrong");
	}
});

router.patch('/', async (req, res) => {
	try {
		if (!req.query.id) {
			return res.status(400).send("Missing required params");
		}
		const message = await Message.findByPk(req.query.id);
		if (!message)
			return res.status(404).send("message not found");

		await message.update({
			message: req.body.message,
			isUpdated: true,
		});
		return res.status(200).send(message);
	} catch (e) {
		console.log(e);
		return res.status(400).send("Something went wrong");
	}
});

module.exports = router;