const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
require("dotenv").config();
const dataController = require("./controller/books.controller");

app.get('/', (req, res) => {
  res.send('Loading')
});

mongoose.connect('mongodb://localhost:27017/mangoDatabase', { useNewUrlParser: true, useUnifiedTopology: true });
app.get('/', dataController);



app.get("/get-users",getUserBook);
app.post("/create-book",addingBookToDB);
app.delete("/delete-book/:id",deleteBook);
server.put('/update/:bookIndex', updateBook);



app.listen(3000, () => {
  console.log("Listining to port 3000")
})
