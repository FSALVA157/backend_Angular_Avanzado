const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

const app = express();

app.use(cors());

//qHCUyjpal6zD3u38
//mean_user
//database
dbConnection();

//rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: "Respuesta de GET en path raiz"
    });
})

app.listen(process.env.PORT, () => {
    console.log(`Server on Port ${process.env.PORT}`);
})