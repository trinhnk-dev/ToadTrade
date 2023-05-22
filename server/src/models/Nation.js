const mongoose = require('mongoose');
const { Schema } = mongoose;

const NationSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Nation', NationSchema);
