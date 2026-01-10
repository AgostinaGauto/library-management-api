const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const LoanDetail = sequelize.define('LoanDetail', {

    detailId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    loanId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    observations: {
        type: DataTypes.STRING(100),
        allowNull: true
    }


}, {
    tableName: 'loan_details',
    timestamps: false

   }
);

module.exports = LoanDetail;