//Conexão com o banco
let mongoose = require("mongoose");
let BlockChainModel = require("./models");

mongoose.connect(
  "mongodb://localhost:27017/blockChain",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) return console.log("Cannot connect to DB");
    console.log("Database is connected");
    //Este método ira retornar a chamada do banco de dados para salvar os dados
    connectionCallBack();
  }
);

let connectionCallBack = () => {};

module.exports.onConnect = callback => {
  connectionCallBack = callback;
};
