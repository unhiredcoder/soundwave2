const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  date:String,
  username: String,
  audioURL: String,
  imageURL: String,
});

// Create a model based on the schema
const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
