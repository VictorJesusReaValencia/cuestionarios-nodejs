import express from 'express';
import path from 'path';
import homeController from './src/backend/controllers/general/home';
import loginPanelController from './src/backend/controllers/panel/login';
import authRoutes from './src/backend/routes/authRoutes';
import bodyParser from 'body-parser';

const app = express();

app.set('views', path.join(__dirname, 'src', 'frontend', 'views'));
app.set('view engine', 'pug');

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas estáticas
app.use(express.static(path.join(__dirname, 'src', 'frontend', 'public')));

// Rutas
app.use(homeController);
app.use(loginPanelController);
app.use('/auth', authRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
