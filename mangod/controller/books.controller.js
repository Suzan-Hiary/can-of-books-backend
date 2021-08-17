const Books =require("../models/books.models");

const bookController=(req,res)=>{
    seedBook();
    res.send(newBooks);
}


module.exports=bookController