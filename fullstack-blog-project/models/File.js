const mongoose = require("mongoose");

// !Schema
const fileSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    uploaded_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// !Model
const File = mongoose.model("File", fileSchema);

module.exports = File;
