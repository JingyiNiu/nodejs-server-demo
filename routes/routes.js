const indexRouter = require('./index.router');
const loginRouter = require('./login.router');
const registerRouter = require('./register.router');
const roleRouter = require('./role.router');
const homeRouter = require('./home.router');
const userRouter = require('./user.router');
const contactRouter = require('./contact.router');
const articlesRouter = require('./articles.router');
const imageRouter = require('./image.router');
const testRouter = require('./test.router');

const adminRouter = require('./admin.router');

const errorHandler = require('../middlewares/errorHandler');

module.exports = (app) => {
    app.use('/', indexRouter);
    app.use('/api/login', loginRouter);
    app.use('/api/register', registerRouter);
    app.use('/api/role', roleRouter);
    // app.use('/api/home', homeRouter);
    // app.use('/api/user', userRouter);
    app.use('/api/contact', contactRouter);
    app.use('/api/article', articlesRouter);
    // app.use('/api/image', imageRouter);
    // app.use('/api/test', testRouter);

    // app.use('/api/admin', adminRouter);

    app.use(errorHandler);
};
