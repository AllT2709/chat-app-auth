const router = require("express").Router();

const { addMessage, getMessages } = require("../controllers/message");

router.post("/", addMessage);
router.get("/:conversationId", getMessages);

module.exports = router;
