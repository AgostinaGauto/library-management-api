const express = require('express');
const app = express();

// middlewares globales
app.use(express.json());


module.exports = app;