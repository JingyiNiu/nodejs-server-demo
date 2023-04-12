module.exports = (error, req, res, next) => {
    let errorStatus = error.statusCode || 500;
    let errorMessage = error.message || 'Something went wrong';

    if (error.code === 'ER_DUP_ENTRY') {
        errorStatus = 400;
        errorMessage = 'Record already exists';
    }

    if (error.name  === 'SequelizeUniqueConstraintError') {
        errorStatus = 400;
        errorMessage = 'Record already exists';
    }

    res.status(errorStatus).json({
        message: errorMessage,
    });
};
