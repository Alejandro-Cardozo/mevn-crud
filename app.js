import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

const app = express();

// DB connection
const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/mevnDB";
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};
mongoose.connect(uri, options).then(
  () => {
    console.log("DB connected");
  },
  err => {
    err;
  }
);

// Middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Routes
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use("/api", require("./routes/note"));

// Middleware for Vue.js router history mode
const history = require("connect-history-api-fallback");
app.use(history());
app.use(express.static(path.join(__dirname, "public")));

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log("Example app listening on port: " + app.get("port"));
});
