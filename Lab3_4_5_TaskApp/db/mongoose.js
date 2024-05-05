const mongoose = require("mongoose")
require('dotenv').config({ path: '../Lab3_4_5_TaskApp/.env' });
const connectionString = process.env.MONGO_URL;
mongoose.connect(connectionString)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });