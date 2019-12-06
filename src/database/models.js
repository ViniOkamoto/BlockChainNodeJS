let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//criar o schema do blockchain
let BlockChainSchema = new Schema({
  posicao: {
    required: true,
    type: Schema.Types.Number
  },
  data: {
    required: true,
    type: Schema.Types.Date,
    default: Date.now()
  },
  transacoes: {
    required: true,
    type: Schema.Types.Array
  },
  prevHash: {
    required: false,
    type: Schema.Types.String
  },
  hash: {
    required: true,
    type: Schema.Types.String
  }
});

module.exports = mongoose.model("BlockChain", BlockChainSchema);
