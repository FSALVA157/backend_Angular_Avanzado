const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');


const app = express();

app.use(cors());

app.use(express.json());

//qHCUyjpal6zD3u38
//mean_user
//database
dbConnection();


app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));



app.listen(process.env.PORT, () => {
    console.log(`Server on Port ${process.env.PORT}`);
});