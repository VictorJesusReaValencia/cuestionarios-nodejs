import express from 'express';
import path from 'path';

const app = express();

app.set('views', path.join(__dirname, '../../../frontend/views'));

// Ruta para renderizar la vista login.pug
app.get('/interaccion/panel/login', (req, res) => {
    res.render('login'); // Renderizar la vista login.pug
});


export default app;