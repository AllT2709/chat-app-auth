const router = require("express").Router();

const {
  getConv,
  getConvofTwoUsers,
  newConversation,
} = require("../controllers/conversation");

router.post("/", newConversation);
router.get("/:userId", getConv);
router.get("/find/:firstUserId/:secondUserId", getConvofTwoUsers);

module.exports = router;
