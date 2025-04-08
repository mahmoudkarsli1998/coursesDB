const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 400).json({
        status: "ERROR",
        message: "this resourse invalid"
    });
};

module.exports = errorHandler;