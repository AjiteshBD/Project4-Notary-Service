/**
 * MempoolController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const RequestObj = require('../services/RequestObj.js');
const Mempool = require('../services/Mempool.js');

let mempool= new Mempool.Mempool();;

module.exports = {

  requestValidation(req, res) {
    if (req.body.address) {
      let requestObj = new RequestObj.RequestObj(req.body.address);

      mempool.addRequesttoValidation(requestObj).then((result) => {
        if (result) {
          return res.json(result);
        } else {
          return res.send("Something went wrong!");
        }
      }).catch((err) => {
        return res.send("Something went wrong!");
      })
    } else {
      return res.send("Check the Body Parameter!");
    }
  },

  validateSignature(req, res) {
    if (req.body.address && req.body.signature) {
      mempool.validateReqByWallet(req.body.address, req.body.signature).then((result) => {
        return res.json(result);
      }).catch((err) => {
        return res.send("Something went Wrong!!");
      })
    } else {
      return res.send("Check the Body Parameter!")
    }
  },



};
