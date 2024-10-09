require("dotenv").config();
const express = require("express");
const indexRouter = require("./router/indexRouter");
const resumeRouter = require("./router/resumeRouter");
const app = express();
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
require('./models/database').connectDatabase();

//logger
const logger = require("morgan");
const ErrorHandler = require("./utils/ErrorHandler");
app.use(logger("short"));  

// bodyparser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session and cookies
app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}))

app.use(cookieParser());


//express-file upload
const fileUpload = require("express-fileupload");
app.use(fileUpload())

const { generatedError } = require("./middlewares/error");


//routes
app.use("/", indexRouter);
app.use("/resume", resumeRouter);
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`request url not found: ${req.url}`), 404);
});
app.use(generatedError);




app.listen(process.env.PORT, () =>
  console.log(`server is listening on ${process.env.PORT}`)
);
