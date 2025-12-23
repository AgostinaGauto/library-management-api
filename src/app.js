const express = require('express');
const app = express();

// Middlewares globales
app.use(express.json());

// acá después irán las rutas
// app.use('/api/books', bookRoutes);

module.exports = app;