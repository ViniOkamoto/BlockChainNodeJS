let hash = require("object-hash");
/**
 * a proof servirá como verificador de criptografia para que conseguissemos comprovar e gerar
 * um hash para a transação.
 */
const TARGET_HASH = hash(156);

let validator = require("./validator");
let mongoose = require("mongoose");

let blockChainModel = mongoose.model("BlockChain");

let chalk = require("chalk");

class BlockChain {
  constructor() {
    //Criar as chains, que ira servir para ligar os blocos, um exemplo será para as transações.
    this.chain = [];
    //Transações
    this.curr_transacao = [];
  }
  /*
  Este método servira para criar os blocos e adicionar a chain
  Basiscamente terá que haver dados dentro desse bloco, criar um hash(Identificador)
  e logo após isso o prevHash(Identificador do hash passado)
*/
  getLastBlock(callback) {
    //Capturar o ultimo bloco do banco

    return blockChainModel.findOne(
      {},
      null,
      { sort: { _id: -1 }, limit: 1 },
      (err, block) => {
        if (err) return console.error("Cannot find last Block");
        return callback(block);
      }
    );
  }

  addNewBlock(prevHash) {
    let block = {
      posicao: this.chain.length + 1,
      data: Date.now(),
      transacoes: this.curr_transacao,
      prevHash: prevHash
    };

    if (validator.proofOfWork() == TARGET_HASH) {
      block.hash = hash(block);
      this.getLastBlock(lastBlock => {
        if (lastBlock) {
          block.prevHash = lastBlock.hash;
        }

        //Adiciona isso a uma instância salva no banco mongoDB sucesso do console
        let newBlock = new blockChainModel(block);
        newBlock.save(err => {
          if (err)
            return console.log(
              chalk.red("Cannot save Block to DB", err.message)
            );
          console.log(chalk.green("Block Saved on the DB"));
        });
        //Inclui o hash na chain
        this.hash = hash(block);
        //Irá adicionar à chain o bloco.
        this.chain.push(block);
        this.curr_transacao = [];
        return block;
      });
    }
  }

  /**
   * Este método ira servir para conseguir capturar a transação realizada
   */
  addNewTransacao(depositante, beneficiado, quantidade) {
    this.curr_transacao.push({ depositante, beneficiado, quantidade });
  }
  /**
   * Este método ira capturar apenas um bloco da chain
   */
  lastBlock() {
    return this.chain.slice(-1)[0];
  }
  /**
   * Esse método ira verificar se a chain está vazia
   */
  isEmpty() {
    return this.chain.length == 0;
  }
}
module.exports = BlockChain;
