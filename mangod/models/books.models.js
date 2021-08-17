const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String
});

const OwnerSchema = new mongoose.Schema({
    email: String,
    books: [bookSchema]
});


const Owner = mongoose.model('User', OwnerSchema);

function seedBook (){
    const newBooks = new Owner(
        {
            email: "suzanhiary4@gmail.com",
            books: [
                {
                    title: "Ulysses",
                    description: "Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904. The title parallels and alludes to Odysseus (Latinised into Ulysses), the hero of Homer's Odyss..",
                    status: "James Joyce",

                },

                {
                    title: " Don Quixote",
                    description: "Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper. He has become obsessed with books of chivalry",
                    status: "Miguel de Cervantes",
                  
                },


   

            {
                title: ". In Search of Lost Time",
                description: "One of the 20th century's enduring works, One Hundred Years of Solitude is a widely beloved and acclaimed novel known throughout the world",
                status: "Gabriel Garcia Marquez",
                
            }

            ]
        }

    ) 
}


        

 seedBook()
module.exports = Owner;
