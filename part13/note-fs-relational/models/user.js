const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: "user",
    underscored: true,
    timestamps: false,
})


module.exports = User;