const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/users");
const authRouter = require("./routes/AuthRouter");
const { login } = require("./controllers/auth/login");

const app = express();
dotenv.config();

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
  } catch (e) {
    throw e;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

//middleware
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser());
app.use(express.json());

//router
app.use("/login", login);
app.use("/api/auth", authRouter);
app.use("/users", userRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Internal Server Error!";
  return res.status(errorStatus).json({
    errorStatus: errorStatus,
    errorMessage: errorMessage,
  });
});

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
  connect();
  console.log(`Server running on port ${app.get("port")}!`);
});
