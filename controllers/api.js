const Book = require('../models/book.model');


const getBooks = async (req, res) =>{

    const books  = await Book.find().limit(20);

    res.status(200).json({
        message: "Query executed successfully",
        results: books 
    })
}


module.exports ={
    getBooks
}