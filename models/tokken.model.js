const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

let tokenSchema = new mongoose.Schema({
  userId: { type: ObjectId }
});

module.exports = mongoose.model("Token", tokenSchema);
