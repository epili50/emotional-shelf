const Book = require('../models/book.model');


const getBooks = async (req, res) =>{

    const books  = await Book.find().limit(20);

    res.status(200).json({
        message: "Query executed successfully",
        results: books 
    })
}

const getRecomendationBooks = async(req, res) =>{

    const { emotion } = req.params;    
    const books = await Book.find({ emotions: { $in: [emotion] } }).limit(20);

    if (books.length === 0) {
        return res.status(404).json({ message: 'No se encontraron libros con esa emoción' });
      };

      res.status(200).json({
        message: "Query executed successfully",
        results: books 
    })
    

}


module.exports ={
    getBooks,
    getRecomendationBooks
}