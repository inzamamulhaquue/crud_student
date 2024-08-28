const mongoose = require('mongoose');

const DB_URI = "mongodb://localhost:27017/crudOperation";

const connectdb = async () =>{
    try{
        await mongoose.connect(DB_URI);
        console.log("Database connected..");
    } catch (err){
        console.error(err);
    }
};

module.exports = connectdb;