const { Sequelize, QueryTypes } = require('sequelize');
const { sequelize } = require('./index');


const main = async () => {
    try {
        const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT });
        console.log(blogs.map(blog => blog.JSON()));
    } catch (error) {
        console.log(error);
    }
}

main();