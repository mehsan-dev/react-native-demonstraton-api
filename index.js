const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to mongodb
connectDB();

app.get("/health-check", (req, res) => {
  res.json({ message: "Well n Good" });
});

app.use("/api/user", require("./routes/user.route"));
app.use("/api/calculator", require("./routes/calculator.route"));

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server listening on localhost: " + PORT));
