// importar módulos de terceros
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');


// rutas de la REST API
const apiRoutes = require('./routes/api.js');

// creamos una instancia del servidor Express
const app = express();

// Tenemos que usar un nuevo middleware para indicar a Express que queremos procesar peticiones de tipo POST
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;


// Usamos el middleware morgan para loguear las peticiones del cliente
app.use(morgan('tiny'));

//Para que lea los json
app.use(express.json());

// Permitir solicitudes de cualquier origen
app.use(cors());

app.use('/api', apiRoutes);

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a la base de datos');
}

connectDB().catch(err => console.log(err))


app.listen(PORT, (req, res) => {
    console.log("Servidor escuchando correctamente en el puerto " + PORT);
});
