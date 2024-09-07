const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/ErrorHandler')
const { catchAsyncError } = require('./catchAsyncErrors')


exports.isAuthenticated = catchAsyncError(async(req, res, next) => {
    const {token} = req.cookies
    res.json(token);
})