const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Data Base Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar la Base de Datos');
    }
};

module.exports = {
    dbConnection
}