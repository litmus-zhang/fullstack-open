const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class Team extends Model { }

Team.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: "team",
    underscored: true,
    timestamps: false,
})

module.exports = Team;