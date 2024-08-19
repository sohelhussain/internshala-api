exports.sendtoken = (student, statusCode, res) => {
    const token = user.getjwttoken();
    res.json({token})
}