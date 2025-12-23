require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3005;

(async () => {
  try {
    //  Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');

    // Sincronizar modelos (solo desarrollo)
    await sequelize.sync();
    console.log('Tablas sincronizadas');

    // Levantar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
  }
})();

