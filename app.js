require("dotenv").config();
const express = require("express");
const indexRouter = require("./router/indexRouter");
const app = express();
require('./models/database').connectDatabase();

//logger
const logger = require("morgan");
const ErrorHandler = require("./utils/ErrorHandler");
app.use(logger("short"));

// bodyparser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { generatedError } = require("./middlewares/error");

app.use("/", indexRouter);
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`request url not found: ${req.url}`), 404);
});
app.use(generatedError);




app.listen(process.env.PORT, () =>
  console.log(`server is listening on ${process.env.PORT}`)
);
