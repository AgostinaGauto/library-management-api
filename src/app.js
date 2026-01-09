// este archivo separa la definicion de la aplicacion (app.js) 
// del arranque del servidor, esto mejora el testeo, escalabilidad y organizacion

const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const memberRoutes = require('./routes/member.routes');
const bookRoutes = require('./routes/book.routes');

// Middlewares globales
app.use(express.json());

// acá después irán las rutas
// app.use('/api/books', bookRoutes);
app.use('/auth', authRoutes);
app.use('/members', memberRoutes);
app.use('/books', bookRoutes);

module.exports = app;