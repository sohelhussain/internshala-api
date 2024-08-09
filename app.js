require("dotenv").config();
const express = require("express");
const indexRouter = require("./router/indexRouter");
const app = express();

//logger
const logger = require("morgan");
const ErrorHandler = require("./utils/ErrorHandler");
app.use(logger("short"));

const { generatedError } = require("./middlewares/error");

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`request url not found: ${req.url}`), 404);
});
app.use(generatedError);

app.use("/", indexRouter);
app.listen(process.env.PORT, () =>
  console.log(`server is listening on ${process.env.PORT}`)
);
