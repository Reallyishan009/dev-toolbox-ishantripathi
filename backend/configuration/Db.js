//Data Source:

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {});


const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("MongoDB connection established successfully.") ;
});
