const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./Config/dbConfig");
const morgan = require("morgan");
const userRoutes = require("./Routes/UserRoutes");
const authRoutes = require("./Routes/AuthRoutes");
const postRoutes = require("./Routes/postRoute");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(morgan("dev"));
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/post", postRoutes);

connectDB();

app.listen(8080, () => {
  console.log("running on the port 8080");
});
