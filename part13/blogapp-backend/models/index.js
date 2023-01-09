const Blog = require('./models')


Blog.sync();

module.exports = {
    Blog
}