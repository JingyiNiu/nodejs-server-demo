const indexRouter = require('./index.router');
const userRouter = require('./user.router');
const loginRouter = require('./login.router');
const contactRouter = require('./contact.router');
const selfIntroRouter = require('./selfintro.router');
const articlesRouter = require('./articles.router');
const imageRouter = require('./image.router');
const errorHandler = require('../middlewares/errorHandler');

module.exports = (app) => {
    app.use('/', indexRouter);
    app.use('/api/user', userRouter);
    app.use('/api/login', loginRouter);
    app.use('/api/contact', contactRouter);
    app.use('/api/self-intro', selfIntroRouter);
    app.use('/api/article', articlesRouter);
    app.use('/api/image', imageRouter);

    app.use(errorHandler);
};
