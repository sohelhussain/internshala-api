const {catchAsyncError} = require('../middlewares/catchAsyncErrors');


exports.homePage = catchAsyncError(async(req,res) => {
        res.json({message: 'this is homePage test'});
})