'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const PORT=process.env.PORT
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
  res.send('Loading')
});

const client = jwksClient({
  jwksUri: `https://${process.env.REACT_APP_AUTH0_DOAMIN}/.well-known/jwks.json`
});

const getKey=(header, callback)=>{
  client.getSigningKey(header.kid, function(err, key) {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
}

app.get('/test', (request, response) => {

  // TODO: 
  // STEP 1: get the jwt from the headers
  // const jwtHed =request.headers.authorization.split(' ')[1];
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  jwt.verify(jwtHed ,getKey,{},(err,user)=>{
    if(err){
        response.json('invalid token');
    }
    response.json(user)
})
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
