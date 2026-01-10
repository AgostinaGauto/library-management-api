const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Loan = sequelize.define('Loan', {

    loanId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    memberId: {
        type: DataTypes.INTEGER,
        allowNull: false

    },

    loanDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW

    },

    returnDate: {
        type: DataTypes.DATE,
        allowNull: true
    },

    state: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'ACTIVO'
    }

}, {
    tableName: 'loans',
    timestamps: false
   }
);

module.exports = Loan;