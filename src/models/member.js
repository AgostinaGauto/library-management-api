const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const member = sequelize.define('Member', {

    memberId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    dni: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    birthdate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    address: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    phone: {
        type: DataTypes.STRING(60),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true
        }
    }

},
    {
        tableName: 'members',
        timestamps: false
    }
);

module.exports = member;