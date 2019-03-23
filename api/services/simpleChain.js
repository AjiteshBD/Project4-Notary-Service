/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');
const levelSandbox = require('./levelSandbox');
const BlockClass = require('./Block.js');

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

  class Blockchain{
  constructor(){
    //this.chain = [];
     this.addBlock(new BlockClass.Block("First block in the chain - Genesis block"));
  }


  async addBlock(newBlock){
          //Get block height from levelDB
          let self = this;
          const height = await self.getBlockHeight();

          console.log(`H : ====` + height)
          //Generate block timestamp
          newBlock.time = new Date().getTime().toString().slice(0, -3);
          //Check if the Block is not Genesis Block
          if (height >= 1) {
              //Get the block
              newBlock.height = height;

               let prevBlockhash = await self.getBlock(height-1)

              //Get previous block's hash
              newBlock.previousBlockHash = prevBlockhash.hash;
          }
          //Generate hash for the new block.
          newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
          //Save the block created to levelDB
          await levelSandbox.addDataToLevelDB(JSON.stringify(newBlock));

  };



  async getBlockHeight(){
          //Return block height from levelDB
          let blockHeight  = await levelSandbox.getBlocksCount();
          return blockHeight;
      };

      // get block
  async getBlock(blockHeight)
  {
          //Return block data from levelDB
        console.log(blockHeight);
        try{
          let block = await levelSandbox.getLevelDBData(blockHeight);
          let prevBlockDetails= await JSON.parse(block);
          let blockDetails = await JSON.parse(JSON.stringify(block).toString());
          return prevBlockDetails;
        }
        catch(err)
        {
          console.log(`err::::::::::`+err);
          throw err;
        }

  };



  async getBlockByHash(hash)
  {
          //Return block data from levelDB
        console.log(hash);
        try{
          let block = await levelSandbox.getBlockByHash(hash);
          let prevBlockDetails= block;//await JSON.parse(block);
          let blockDetails = await JSON.parse(JSON.stringify(block).toString());
          console.log(`Block # :` + hash +`Details :: `+ prevBlockDetails);
          return prevBlockDetails;
        }
        catch(err)
        {
          console.log(`err::::::::::`+err);
          throw err;
        }

  };


  // async getBlockByAddress(address)
  // {
  //         //Return block data from levelDB
  //       console.log('In simpleChain==='+address);
  //       try{
  //         let block = await levelSandbox.getBlockByAddress(address);
  //         let prevBlockDetails= block;//await JSON.parse(block);
  //         //let blockDetails = await JSON.parse(JSON.stringify(block).toString());
  //         console.log(`Block # :` + address +`Details :: `+ prevBlockDetails);
  //         return prevBlockDetails;
  //       }
  //       catch(err)
  //       {
  //         console.log(`err::::::::::`+err);
  //         throw err;
  //       }
  //
  // };

  async getBlockByAddress(address)
  {
          //Return block data from levelDB
        try{
          let block = await levelSandbox.getBlockByAddress(address);
          return block;
        }
        catch(err)
        {
          console.log(`err::::::::::`+err);
          throw err;
        }

  };





//validate block
async validateBlock(blockHeight){
  // get block object
  let block = await this.getBlock(blockHeight);
  // get block hash
  let blockHash = block.hash;
  // remove block hash to test block integrity
  block.hash = "";
  // generate block hash
  let validBlockHash = SHA256(JSON.stringify(block)).toString();
  // Compare
  if (blockHash===validBlockHash) {
      return true;
    } else {
      console.log('Block #'+blockHeight+' invalid hash:\n'+blockHash+'<>'+validBlockHash);
      return false;
    }
}

// Validate blockchain
async validateChain(){
 let errorLog = [];
 let blockHeight = await this.getBlockHeight();
   for (var i = 0; i < blockHeight-1; i++) {
         // validate block
     if (!this.validateBlock(i))errorLog.push(i);
     // compare blocks hash link
     console.log(`I ::`+i);
      let currentBlock =await this.getBlock(i);
      let blockHash = currentBlock.hash;

     let block = await this.getBlock(i+1);
     let  previousHash = block.previousBlockHash;


     if (blockHash!==previousHash) {
       errorLog.push(i);
     }
   }

   if (errorLog.length>0) {
     console.log('Block errors = ' + errorLog.length);
     console.log('Blocks: '+errorLog);
   } else {
     console.log('No errors detected');
   }
 }

}
module.exports.Blockchain = Blockchain;
