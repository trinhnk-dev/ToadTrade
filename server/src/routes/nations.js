const express = require("express");
const { validateAdmin } = require("../middlewares/validateAdmin");
const {
  getNations,
  getNation,
  addNations,
  editNations,
  deleteNations,
} = require("../controllers/nationController");

const nationRouter = express.Router();

//GET
nationRouter.get("/", getNations);

//POST
nationRouter.post("/add", validateAdmin, addNations);

//PUT
nationRouter.put("/:Id", validateAdmin, editNations);

//DELETE
nationRouter.delete("/:Id", validateAdmin, deleteNations);

module.exports = nationRouter;
