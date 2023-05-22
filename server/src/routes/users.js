const express = require("express");
const { validateAdmin } = require("../middlewares/validateAdmin");
const {
  register,
  editInfo,
  getUser,
  getAllUsers,
  upRole,
  removeUsers,
  downRole,
} = require("../controllers/userController");

const userRouter = express.Router();

//GET
userRouter.get("/me/:Id", getUser);

//POST
userRouter.post("/register", register);

//PUT
userRouter.put("/edit/:Id", editInfo);

//GET
userRouter.get("/all", validateAdmin, getAllUsers);

//PUT
userRouter.put("/up/:Id", validateAdmin, upRole);

//PUT
userRouter.put("/down/:Id", validateAdmin, downRole);

//PUT
userRouter.delete("/:Id", validateAdmin, removeUsers);

module.exports = userRouter;
