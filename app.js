const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./db/connect.js");
const { authRouter } = require("./routes/auth.js");
const { jobsRouter } = require("./routes/jobs.js");
const { protect } = require("./middleware/authintication.js");

// Security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Jobs API is running...");
});

// PORT
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

// Parse Json MW
app.use(express.json());

// Auth Route
app.use("/api/v1/auth", authRouter);

// Jobs Route
app.use("/api/v1/jobs", protect, jobsRouter);

// Security MW
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

const start = async () => {
  try {
    // eslint-disable-next-line no-undef
    await connectDb(process.env.VITE_MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
