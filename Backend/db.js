const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://Siddhant03102001:Siddhant03102001@cluster0.mpeimtq.mongodb.net/newdb?retryWrites=true&w=majority";

const connecttoMongo = () => {
    mongoose.connect(mongoURI)
    mongoose.connection.on('connected', () => {
      console.log("Connected to mongoDB")
    })
    mongoose.connection.on('error', () => {
      console.log("error")
    })
}

module.exports = connecttoMongo