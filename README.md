# Private Blockchain notary Service

This is a Private Blockchain notary Service via API using Nodejs RestFul API Framework sails.js.
This Secure a digital assets on private blockchain which keep the sharable ledger of which star belongs to whom by adding owner wallet address a proof.
This Project acts notary service and PROOF OF EXISTENCE for Star registry in Private Blockchain and make it permanent and immutable.

## Steps to follow

1. Clone the repository to your local computer.
2. Open the terminal and install the packages: `npm install`.
3. Run your application `sails lift`.
4. Test your Endpoints with Curl or Postman.

## Examples
POSTMAN:
=======================================================================================================================================================
GET :
Test the API GET Endpoint:
Once the application is Started test you GET Point with Postman by selecting the GET from request type dropdown and accessing the url :
'http://localhost:8000/block/{BlockHeight}'
(ex: http://localhost:8000/block/1)


GET :
Test the API GET Endpoint to Search Star by Hash:
Once the application is Started test you GET Point with Postman by selecting the GET from request type dropdown and accessing the url :
'http://localhost:8000/stars/hash/{BlockHash}'
(ex: http://localhost:8000/stars/hash/6bee4795360be9cd4b6a4b662f24bb38ba56699364f9fccc6e6e64bc5e25aa62)


GET :
Test the API GET Endpoint to Search Star by wallet Address:
Once the application is Started test you GET Point with Postman by selecting the GET from request type dropdown and accessing the url :
'http://localhost:8000/stars/address/{walletAddress}'
(ex: http://localhost:8000/stars/address/1PFRy2XwAsWYh49t6EH6HsiZygm7GDTdY3)


-------------------------------------------------------------------------------------------------------------------------------------------------------
POST:
Test the API POST Endpoint to Request Validation :
Once the application is Started test you POST Point with Postman by selecting the POST from request type dropdown and accessing the url:
'http://localhost:8000/requestValidation in request body {address in JSON Format}'
(ex: http://localhost:8000/requestValidation
  request Body'{
  "address":"19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL"
  }')

POST:
Test the API POST Endpoint to Message signature Validation :
Once the application is Started test you POST Point with Postman by selecting the POST from request type dropdown and accessing the url:
'http://localhost:8000/message-signature/validate in request body {address and signature in JSON Format}'
(ex: http://localhost:8000/message-signature/validate
  request Body'{
  "address":"19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
   "signature":"H8K4+1MvyJo9tcr2YN2KejwvX1oqneyCH+fsUL1z1WBdWmswB9bijeFfOfMqK68kQ5RO6ZxhomoXQG3fkLaBl+Q="
  }')

POST:
Test the API POST Endpoint:
Once the application is Started test you POST Point with Postman by selecting the POST from request type dropdown and accessing the url:
'http://localhost:8000/block?{body=data}'
(ex: http://localhost:8000/block?body=Test)


=========================================================================================================================================================

Curl:
=========================================================================================================================================================
GET:
Test the API GET Endpoint:
Once the application is Started test you GET Point with Curl opening terminal or cmd and typing the command :
curl 'http://localhost:8000/block/{BlockHeight}'
(ex: curl http://localhost:8000/block/1)

GET :
Test the API GET Endpoint to Search Star by Hash:
Once the application is Started test you GET Point with Curl opening terminal or cmd and typing the command :
'http://localhost:8000/stars/hash/{BlockHash}'
(ex: http://localhost:8000/stars/hash/6bee4795360be9cd4b6a4b662f24bb38ba56699364f9fccc6e6e64bc5e25aa62)


GET :
Test the API GET Endpoint to Search Star by wallet Address:
Once the application is Started test you GET Point with Curl opening terminal or cmd and typing the command :
'http://localhost:8000/stars/address/{walletAddress}'
(ex: http://localhost:8000/stars/address/1PFRy2XwAsWYh49t6EH6HsiZygm7GDTdY3)

----------------------------------------------------------------------------------------------------------------------------------------------------------
POST:
Test the API POST Endpoint to Request Validation :
Once the application is Started test you GET Point with Curl opening terminal or cmd and typing the command :
'http://localhost:8000/requestValidation -d {address in JSON Format}'
(ex: http://localhost:8000/requestValidation -d '{
    "address":"19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL"
}')

POST:
Test the API POST Endpoint to Message signature Validation :
Once the application is Started test you GET Point with Curl opening terminal or cmd and typing the command :
'http://localhost:8000/message-signature/validate -d {address in JSON Format,signature in JSON Format}'
(ex: http://localhost:8000/message-signature/validate -d '{
"address":"19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
 "signature":"H8K4+1MvyJo9tcr2YN2KejwvX1oqneyCH+fsUL1z1WBdWmswB9bijeFfOfMqK68kQ5RO6ZxhomoXQG3fkLaBl+Q="
}')


POST:
Test the API POST Endpoint to Add new block to blockchain:
Once the application is Started test you GET Point with Curl opening terminal or cmd and typing the command :
curl 'http://localhost:8000/block -d {"body=data"}'
(ex: curl http://localhost:8000/block -d "body=data")


=========================================================================================================================================================

NOTE : if you had a provide request payload the POST request will add new Block to the chain.

Did you read this far? You're awesome :)
