const router = require("express").Router();

const { getAllUsers, getUser } = require("../controllers/user");

router.get("/:id", getUser);
router.get("/", getAllUsers);

module.exports = router;
