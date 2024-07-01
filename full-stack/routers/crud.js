const express = require("express");
const router = express.Router();

const {getAll, getSingle, post, editing, dlt} = require("../controller/crud")

router.route("/").get(getAll)
router.route("/").post(post)
router.route("/:id").get(getSingle).delete(dlt).patch(editing)

module.exports = router;