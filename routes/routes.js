const contactRouter = require('./contact.router');
const articlesRouter = require('./articles.router');
const imagesRouter = require('./images.router');
const homeRouter = require('./home.router');

module.exports = (app) => {
    app.use('/', homeRouter);
    app.use('/api/contact', contactRouter);
    app.use('/api/articles', articlesRouter);
    app.use('/api/images', imagesRouter);
};
