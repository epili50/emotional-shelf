const Book = require('../models/book.model');


const getBooks = async (req, res) =>{

    const books  = await Book.find().limit(20);

    res.status(200).json({
        message: "Query executed successfully",
        results: books 
    })
}

const getRecommendationBooks = async(req, res) =>{

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

const getRandomRecommendationBook = async (req, res) =>{
    const { emotion } = req.params;    
    const books = await Book.find({ emotions: { $in: [emotion] } })

    if (books.length === 0) {
        return res.status(404).json({ message: 'No se encontraron libros con esa emoción' });
      };
    
    const randomIndex = Math.floor(Math.random() * books.length);

    const randomBook = books[randomIndex];

    res.status(200).json({
        message: "Query executed successfully",
        results: randomBook 
    })





}


module.exports ={
    getBooks,
    getRecommendationBooks, 
    getRandomRecommendationBook
}