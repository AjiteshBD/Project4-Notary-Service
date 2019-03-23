
class RequestObjValidate
{
  constructor(request,isValid)
  {
    this.registerStar =true;
    this.status={
      address : request.walletAddress,
      requestTimeStamp : request.requestTimeStamp,
      message : request.message,
      validationWindow :  request.validationWindow,
      messageSignature : isValid

    };
  }
}

module.exports.RequestObjValidate = RequestObjValidate;
