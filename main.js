let database = require("./src/database");
database.onConnect(() => {
  let BlockChain = require("./src/blockchain");

  let blockChain = new BlockChain();

  let hash = require("object-hash");
  /**
   * a proof servirá como verificador de criptografia para que conseguissemos comprovar e gerar
   * um hash para a transação.
   */
  let PROOF = 156;

  /*Aqui é onde ocorrera a adição na transação realizada pelo cliente, gerando o hash
   * e só irá realizar se os dois proofs forem gerados corretamente.
   */
  // if (proofOfWork() == PROOF) {
  //   blockChain.addNewTransacao("Vinicius", "Guilherme", 200);
  //   //Então aqui ele confere se existe um hash antigo, se não existe ele retornará o hash do ultimo bloco
  //   let prevHash = blockChain.lastBlock() ? blockChain.lastBlock().hash : null;
  //   blockChain.addNewBlock(prevHash);
  // }

  blockChain.addNewTransacao("Vinicius", "Guilherme", 200);
  blockChain.addNewBlock(null);

  console.log("Chain :", blockChain.chain);
});
