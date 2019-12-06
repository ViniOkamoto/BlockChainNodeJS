let BlockChain = require("./src/blockchain");

let blockChain = new BlockChain();

let hash = require("object-hash");
/**
 * a proof servirá como verificador de criptografia para que conseguissemos comprovar e gerar
 * um hash para a transação.
 */
let PROOF = 156;

let validProof = proof => {
  //confere o hash que está sendo gerado por número, então é gerado hash por proof.
  let identificador = hash(proof);
  console.log("Gerando hash", identificador);
  return identificador == hash(PROOF);
};

//Aqui irá conferir o proof que estamos trabalhando, se não for o proof ao qual datamos em cima, irá ocorrer o loop
let proofOfWork = () => {
  let proof = 0;
  while (true) {
    if (!validProof(proof)) {
      proof++;
    } else {
      break;
    }
  }
  return proof;
};
/*Aqui é onde ocorrera a adição na transação realizada pelo cliente, gerando o hash
 * e só irá realizar se os dois proofs forem gerados corretamente.
 */
if (proofOfWork() == PROOF) {
  blockChain.addNewTransacao("Vinicius", "Guilherme", 200);
  //Então aqui ele confere se existe um hash antigo, se não existe ele retornará o hash do ultimo bloco
  let prevHash = blockChain.lastBlock() ? blockChain.lastBlock().hash : null;
  blockChain.addNewBlock(prevHash);
}

console.log("Chain :", blockChain.chain);
