const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Repair = sequelize.define('Repair', {

    repairId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    entryDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    reason: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    dischargeDate: {
        type: DataTypes.DATE,
        allowNull: true
    },

    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    tableName: 'repairs',
    timestamps: true
   
});

module.exports = Repair;