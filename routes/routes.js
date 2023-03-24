const indexRouter = require('./index.router');
const loginRouter = require('./login.router');
const userRouter = require('./user.router');
const contactRouter = require('./contact.router');
const articlesRouter = require('./articles.router');

const adminRouter = require('./admin.router');

const errorHandler = require('../middlewares/errorHandler');

module.exports = (app) => {
    app.use('/', indexRouter);
    app.use('/api/login', loginRouter);
    app.use('/api/user', userRouter);
    app.use('/api/contact', contactRouter);
    app.use('/api/article', articlesRouter);

    app.use('/api/admin', adminRouter);

    app.use(errorHandler);
};
