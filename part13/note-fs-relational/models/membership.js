const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class Membership extends Model { };

Membership.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "teams", key: "id" },
    },
}, {
    sequelize,
    modelName: "membership",
    underscored: true,
    timestamps: false,
})

module.exports = Membership;