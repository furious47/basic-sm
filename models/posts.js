const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema(
  {
    post: {
      type: String,
      required: [true, "pls provide job"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "login",
      required: [true, "pls provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", jobsSchema);
