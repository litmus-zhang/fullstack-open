const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(DATABASE_URL);

const migrationConf = {
    migrations: {
        glob: "migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
};
const runMigrations = async () => {
    const migrator = new Umzug(migrationConf);
    const migrations = await migrator.up();
    console.log("Migrations up to date", {
        files: migrations.map((m) => m.name),
    });
}


const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await runMigrations();
        console.log("Connection to database successful");
    } catch (error) {
        console.log("Connection to database failed");
        console.log({
            error: error.message,
        });
        return process.exit(1);
    }
    return null;
}

const rollbackMigration = async () => {
    await sequelize.authenticate();
    const migrator = new Umzug(migrationConf);
    const migrations = await migrator.down();
}


module.exports = { connectToDatabase, sequelize, rollbackMigration }

