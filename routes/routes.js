const indexRouter = require('./index.router');
const userRouter = require('./user.router');
const loginRouter = require('./login.router');
const contactRouter = require('./contact.router');
const selfIntroRouter = require('./selfintro.router');
const articlesRouter = require('./articles.router');
const imagesRouter = require('./images.router');
const errorHandler = require('../middlewares/errorHandler');

module.exports = (app) => {
    app.use('/', indexRouter);
    app.use('/api/user', userRouter);
    app.use('/api/login', loginRouter);
    app.use('/api/contact', contactRouter);
    app.use('/api/self-intro', selfIntroRouter);
    app.use('/api/articles', articlesRouter);
    app.use('/api/images', imagesRouter);

    app.use(errorHandler);
};
