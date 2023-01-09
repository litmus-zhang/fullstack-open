const { DATABASE_URL } = require("./config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(DATABASE_URL);

const connectToDb = async () => {
    try {
        sequelize.authenticate();
        console.log("Connection to database successful");
    } catch (error) {

        console.log("Connection to database failed");
        return process.exit(1);
    }
    return null;
};


module.exports = { sequelize, connectToDb };