const asyncMiddleware = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = asyncMiddleware;

/*
Usage:
    user.router.js
    const asyncMiddleware = require("../middlewares/asyncMiddleware")
    router.get('/', asyncMiddleware(userController.getAllUsers));

Cons:
    need to apply it in front every routes
    use npm package "express-async-errors" instead

*/
