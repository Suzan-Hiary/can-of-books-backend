const mongoose=require("mongoose"); 

const bookSchema = new mongoose.Schema({
    title:String,
    description:String,
    status:String,
    email : String 
});

const Books = mongoose.model('Books', bookSchema);

const seedCat =()=>{
    const newBooks =new Books({
        title:"Ulysses",
        description:"Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904. The title parallels and alludes to Odysseus (Latinised into Ulysses), the hero of Homer's Odyss..",
        status:"James Joyce" ,
        email : "suzanhiary4@gmail.com"
    })

   
    newBooks.save();
    console.log(newBooks);
}


module.exports=Books ;
