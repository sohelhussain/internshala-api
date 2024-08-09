require("dotenv").config();
const express = require("express");
const indexRouter = require("./router/indexRouter");
const app = express();

//logger
const logger = require("morgan");
app.use(logger("short"));

app.use("/", indexRouter);

app.listen(process.env.PORT, () =>
  console.log(`server is listening on ${process.env.PORT}`)
);
