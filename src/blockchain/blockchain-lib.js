// src/blockchain/blockchain-lib.js
export class Block {
  constructor(data, prevHash = '') {
    this.data     = data;
    this.prevHash = prevHash;
    this.hash     = this.computeHash();
  }
  computeHash() {
    // super-simple hash stub
    return this.prevHash + '|' + Buffer.from(JSON.stringify(this.data)).toString('base64');
  }
}

export class Blockchain {
  constructor() {
    this.chain = [new Block('Genesis')];
  }
  addBlock(block) {
    block.prevHash = this.chain[this.chain.length - 1].hash;
    block.hash     = block.computeHash();
    this.chain.push(block);
  }
}
