const express = require("express");
const router = express.Router();

const { getAll, create, update, destroy } = require("./controller");
const { auth } = require("../../middlewares");

router.get("/", getAll);
router.post("/", create);
router.put("/:acronym", auth.verifyToken, update);
router.delete("/:acronym", auth.verifyToken, destroy);

module.exports = router;
