const SHA256 = require('crypto-js/sha256');
class Block{
  constructor(index, timestamp, data, previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  /**
   * @returns {Block}
   */
  createGenesisBlock() {
    return new Block(Date.parse('2017-01-01'), [], '0');
  }

  /**
   * Returns the latest block on our chain. Useful when you want to create a
   * new Block and you need the hash of the previous Block.
   *
   * @returns {Block[]}
   */
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}
let ghCoin = new Blockchain();
ghCoin.addBlock(new Block(1, "10/08/2021", {amount: 4}));
ghCoin.addBlock(new Block(1, "11/08/2021", {amount: 10}));
console.log(JSON.stringify(ghCoin, null, 4));
