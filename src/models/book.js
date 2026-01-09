const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Book = sequelize.define('Book', {

    bookId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    author: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    editorial: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    editionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    language: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    pages: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    state: {
        type: DataTypes.ENUM('EN_BIBLIOTECA', 'PRESTADO', 'EN_REPARACION'),
        allowNull: false,
        defaultValue: 'EN_BIBLIOTECA'
    }
},

    {
        tableName: 'books',
        timestamps: false
    }
);

module.exports = Book;