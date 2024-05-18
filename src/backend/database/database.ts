import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('interacciones', 'root', '969364VR', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida exitosamente.');
  })
  .catch((err: Error) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

export default sequelize;
