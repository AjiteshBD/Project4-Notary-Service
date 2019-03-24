/**
 * BlockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Block = require('../services/Block.js');
const BlockChainClass = require('../services/simpleChain.js');
const Mempool = require('../services/Mempool.js');
const hex2ascii =  require('hex2ascii');

let blockchain = new BlockChainClass.Blockchain();
let mempool = new Mempool.Mempool();

module.exports = {


  getBlockByIndex(req,res){
    let id = req.param('index');
    blockchain.getBlock(id).then((block) => {
      if(block.body.star)
      {
       block.body.star.storyDecoded =hex2ascii(block.body.star.story);
      }
      return res.json(block);
    }).catch((err) => {
      return res.notFound();
    });
 },

 getBlockByHash(req,res){
   let id = req.param('hash');
   blockchain.getBlockByHash(id).then((block) => {
      if(block.body.star)
      {
       block.body.star.storyDecoded =hex2ascii(block.body.star.story);
      }
     return res.json(block);
   }).catch((err) => {
     return res.notFound();
   });
},

// getBlockByAddress(req,res){
//   let id = req.param('address');
//   //let promises = [];
//   blockchain.getBlockByAddress(id).then((block) => {
//     console.log('BBB::'+block);
//       //console.log('DDD::'+JSON.parse(block));
//        if(block.body.star)
//        {
//           console.log('ooo::'+block);
//         block.body.star.storyDecoded =hex2ascii(block.body.star.story);
//       }
//       return res.json(block);
// }).catch((err) => {
//     return res.notFound();
//   });
// },


async getBlockByAddress(req,res){
  let id = req.param('address');
  try{
    let block= await  blockchain.getBlockByAddress(id);
      return res.json(block);
    }catch(err)
    {
        return res.notFound();
    }
},




async postNewBlock(req, res) {
  let newBlock = null;
  if (req.body.address && req.body.star) {
    let result = await mempool.searchByWalletAddress(req.body.address);
    if (result) {
      let RA = req.body.star.ra;
      let DEC = req.body.star.dec;
      let MAG = req.body.star.mag;
      let CEN = req.body.star.cen;
      let starStory = req.body.star.story;
      console.log(starStory);
      if (RA && DEC) {
        console.log("In RA" + RA);
        let body = {
          address: req.body.address,
          star: {
            ra: RA,
            dec: DEC,
            mag: MAG,
            cen: CEN,
            story: Buffer(starStory).toString('hex')
          }
        };
        newBlock = new Block.Block(body);
        if (newBlock != null) {
          try {
            await blockchain.addBlock(newBlock);
            mempool.removeValidationReq(req.body.address);
            mempool.removeMempoolValidReq(req.body.address);
            let height = await blockchain.getBlockHeight();
            blockchain.getBlock(height).then((block) => {
            block.body.star.storyDecoded =hex2ascii(block.body.star.story);
              return res.json(block);
            }).catch((err) => {
              return res.notFound();
            });
          } catch (err) {
            return res.notFound();
          }
        }
      }
    } else {
      return res.send("address cannot be found!");
    }
  } else {
    return res.send("Check body Parameter!");
  }



}


};
