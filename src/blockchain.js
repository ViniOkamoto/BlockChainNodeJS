let hash = require("object-hash");

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

  addNewBlock(prevHash) {
    let block = {
      posição: this.chain.length + 1,
      data: Date.now(),
      transacoes: this.curr_transacao,
      prevHash: prevHash
    };

    //Inclui o hash na chain
    this.hash = hash(block);
    //Irá adicionar à chain o bloco.
    this.chain.push(block);
    this.curr_transacao = [];
    return block;
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
