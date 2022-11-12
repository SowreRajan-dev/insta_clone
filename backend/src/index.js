const express = require("express");
require("dotenv").config();
const connectDB = require("./Config/dbConfig");
const morgan = require("morgan");
const userRoutes = require("./Routes/UserRoutes");
const authRoutes = require("./Routes/AuthRoutes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

connectDB();

app.listen(8080, () => {
  console.log("running on the port 8080");
});
