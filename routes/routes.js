const indexRouter = require('./index.router');
const contactRouter = require('./contact.router');
const selfIntroRouter = require('./selfintro.router');
const articlesRouter = require('./articles.router');
const imagesRouter = require('./images.router');

module.exports = (app) => {
    app.use('/', indexRouter);
    app.use('/api/contact', contactRouter);
    app.use('/api/self-intro', selfIntroRouter);
    app.use('/api/articles', articlesRouter);
    app.use('/api/images', imagesRouter);
};
