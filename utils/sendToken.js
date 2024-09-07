exports.sendtoken = (student, statusCode, res) => {
    const token = student.getjwttoken();
    res.json({token});
}