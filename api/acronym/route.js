const express = require("express");
const router = express.Router();

const { getAll, create, update, destroy } = require("./controller");

router.get("/", getAll);
router.post("/", create);
router.put("/:acronym", update);
router.delete("/:acronym", destroy);

module.exports = router;
