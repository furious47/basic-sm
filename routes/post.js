const {
  getallpost,
  createpost,
  getonepost,
  updatepost,
  deletepost,
} = require("../controller/posts");

const express = require("express");
const router = express.Router();

router.route("/").get(getallpost).post(createpost);
router.route("/:id").get(getonepost).delete(deletepost).patch(updatepost);

module.exports = router;
