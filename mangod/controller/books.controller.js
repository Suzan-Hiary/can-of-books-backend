const Books =require("../models/books.models");


const getUsers=(req,res)=>{
    Books.find({},(err,data)=>{
        if (err){
            res.send("error happend")
        }
        else{
            res.json(data)
        }
    });
}
const bookController=(req,res)=>{
    seedBook();
    res.send(Books);
}


module.exports=bookController