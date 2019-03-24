const bitcoin = require('bitcoinjs-lib');
const bitcoinMessage = require('bitcoinjs-message');
const RequestObjValidate = require('../services/RequestObjValidate');

const TimeoutRequestTime = 5 * 60 * 1000;
//const TimeoutMempoolValidTime = 30 * 60 * 1000;
 //let arr =[];
 let mempool =[];
 let mempoolValid = [];
class Mempool {

    constructor() {

    this.timeoutRequests = [];

    this.timeoutMempoolValid = [];

  }

  addRequesttoValidation(req) {
    let self = this;
    return new Promise((resolve, reject) => {
      self.searchReqByWalletAddress(req.walletAddress).then((result) => {
        if (result) {
          resolve(result);
        } else {
          mempool.push(req);
          self.timeoutRequests[req.walletAddress] = setTimeout(function() {
            self.removeValidationReq(req.walletAddress);
          }, TimeoutRequestTime);
          resolve(req);
        }
      }).catch((err) => {
        reject(err);
      })
    });

  }


  searchReqByWalletAddress(address) {
    let self = this;
    return new Promise((resolve, reject) => {
      mempool.forEach((req) => {
        if (req.walletAddress == address) {
          let timeElapse = (new Date().getTime().toString().slice(0, -3)) - req.requestTimeStamp;
          let timeLeft = (TimeoutRequestTime / 1000) - timeElapse;
          req.validationWindow = timeLeft;
          resolve(req);
        }
      });
      resolve(undefined);
    });
  }

  async searchByWalletAddress(address) {
    let result =null;
      mempoolValid.forEach((req) => {
        if (req.status.address == address) {
          result= req;
        }
      });
      return result;


  }


  removeValidationReq(address) {
    try {
      let index = 0;
      mempool.forEach((req) => {
        if (req.walletAddress = address) {
          mempool.splice(index, 1);
        }
      });
      index++;
    } catch (e) {
      this.timeoutRequests[address] = null;
    }
}


removeMempoolValidReq(address) {
  try {
    let index = 0;
    mempoolValid.forEach((req) => {

      if (req.status.address = address) {
        mempoolValid.splice(index, 1);
      }
    });
    index++;
  } catch (e) {
    this.timeoutRequests[address] = null;
  }
}



  validateReqByWallet(address, signature) {
  let self = this;
  return new Promise((resolve, reject) => {
    self.searchReqByWalletAddress(address).then((result) => {
      if (result) {
        let isValid = bitcoinMessage.verify(result.message, address, signature);
        let reqObjValidate = new RequestObjValidate.RequestObjValidate(result, isValid);
        if (isValid) {
          let timeElapse = (new Date().getTime().toString().slice(0, -3) - reqObjValidate.status.requestTimeStamp);
          let timeleft = (TimeoutRequestTime / 1000) - timeElapse;
          reqObjValidate.status.validationWindow = timeleft;
          mempoolValid.push(reqObjValidate);
          self.timeoutMempoolValid[reqObjValidate.status.address] = setTimeout(function() {
            self.removeValidationReq(reqObjValidate.status.address);
          }, TimeoutRequestTime);
        }
        resolve(reqObjValidate);
      } else {
        resolve(undefined);
      }
    }).catch((err) => {
      console.log("Error::!" + err);
    })
  });
}


// getMempool()
// {
//   let self = this;
//
//
//     self.mempool.forEach((req)=>{
//        arr.push(req);
//     })
//
//
//
//    console.log(arr);
//    return arr;
// }

}



module.exports.Mempool = Mempool;
