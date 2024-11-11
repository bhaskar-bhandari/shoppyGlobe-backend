const mongoose = require('mongoose');

const connectDB = mongoose.connect("mongodb://localhost:27017/shoppy_mongo_uri")
.then(()=>console.log('connection sucessful ho gaya'))
.catch((error)=>console.log('MongoDB connection failed:', error.message))


module.exports = connectDB;