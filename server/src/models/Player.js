const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlayerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    yoB: {
      type: Number,
      require: true,
    },
    club: {
      type: String,
      require: true,
    },
    position: {
      type: String,
      require: true,
    },
    jerseyNumber: {
      type: Number,
      require: true,
    },
    goals: {
      type:Number,
      require: true,
    },
    nation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nation",
      require: true,
    }
  }
);

module.exports = mongoose.model("Player", PlayerSchema);