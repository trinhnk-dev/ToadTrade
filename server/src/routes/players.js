const express = require("express");
const { validateAdmin } = require("../middlewares/validateAdmin");
const {
  getPlayers,
  getPlayer,
  addPlayers,
  editPlayers,
  deletePlayers,
} = require("../controllers/playerController");

const playerRouter = express.Router();

//GET
playerRouter.get("/", getPlayers);
playerRouter.get("/:Id", getPlayer);

//POST
playerRouter.post("/add", validateAdmin, addPlayers);

//PUT
playerRouter.put("/:Id", validateAdmin, editPlayers);

//DELETE
playerRouter.delete('/:Id', validateAdmin, deletePlayers);

module.exports = playerRouter;
