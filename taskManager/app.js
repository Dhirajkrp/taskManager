require("dotenv").config();
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notFound");
const PORT = process.env.PORT || 3000;

//serving static files
app.use("^/$|/index(.html)?", express.static("./public"));

//middleware
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URL);
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT} `);
    });
  } catch (err) {
    console.log(`something went wrong:${err}`);
  }
};

start();
