// src/blockchain/blockchain.js
import { Blockchain, Block } from './blockchain-lib.js';

const chain = new Blockchain();
chain.addBlock(new Block('Message encryption key generation'));

console.log('Blockchain state:', chain);
