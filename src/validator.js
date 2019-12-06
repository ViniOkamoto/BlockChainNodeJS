module.exports.validProof = proof => {
  //confere o hash que está sendo gerado por número, então é gerado hash por proof.
  let identificador = hash(proof);

  console.log("Gerando hash", identificador);
  return identificador == hash(PROOF);
};
//Aqui irá conferir o proof que estamos trabalhando, se não for o proof ao qual datamos em cima, irá ocorrer o loop
module.exports.proofOfWork = () => {
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
