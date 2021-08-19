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
   const jwtHed =request.headers.authorization.split(' ')[1];
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


app.get("/get-users",getUserBook);
app.post("/create-book",addingBookToDB);
app.delete("/delete-book/:id",deleteBook);
server.put('/update/:bookIndex', updateBook);


function getUserBook(req, res) {
  let userEmail = req.query.userEmail;

  userModel.find({ email: userEmail }, function (error, userData) {
      if (error) {
          console.log('test :',res.status)
          res.send('did not work')
      } else {
          res.send(userData[0].books)
      }
  })
}


function addingBookToDB(req, res) {

  let { email, name, description, status, img } = req.body;

  userModel.find({ email: email }, function (error, userData) {
      if (error) {
          res.send('did not work')
      } else {
          userData[0].books.push({
              name: name,
              description: description,
              status: status,
              img: img
          })
          userData[0].save();
          res.send(userData[0].books)

      }
  })




}


function deleteBook(req, res) {
  let emailReq = req.query.email;
  let indexReq = Number(req.params.bookIndex);


  userModel.find({ email: emailReq }, function (error, userData) {
      if (error) {
          res.send('did not work')
      } else {

          let dataAfterDelete = userData[0].books.filter((book, index) => {
              if (index !== indexReq) { return book }
          })
          userData[0].books = dataAfterDelete;

          userData[0].save();

          res.send(userData[0].books);

      }
  })


}


function updateBook(req, res) {
  const { email , name , description , status , img  } = req.body;

  let index = req.params.bookIndex;

  userModel.findOne({email:email},(error,userData)=>{
      if(error) res.send('error in finding the data')
      else {
          userData.books.splice(index,1,{
              name : name,
              description : description,
              status : status,
              img : img,
          })
          userData.save();
          res.send(userData.books)
          
      }
  })




}

app.listen(PORT, () => console.log(`listening on ${PORT}`));