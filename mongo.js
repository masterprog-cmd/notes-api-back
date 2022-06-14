const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://masterprog-cmd:HkT91o52@cluster0.yoprb.mongodb.net/masterdb?retryWrites=true&w=majority';

//Conexión mongoDB
mongoose.connect(connectionString)
    .then(() => {
        console.log('Connected to database!');

    })
    .catch(() => {
        console.log('Connection failed!');
    })