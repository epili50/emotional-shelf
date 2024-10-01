const Book = require("../models/book.model");
const { validationResult } = require("express-validator");

const getBooks = async (req, res) => {
  const books = await Book.find().limit(20);

  res.status(200).json({
    message: "Query executed successfully",
    results: books,
  });
};

const getRecommendationBooks = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { emotion } = req.params;
  const books = await Book.find({ emotions: { $in: [emotion] } }).limit(20);

  res.status(200).json({
    message: "Query executed successfully",
    results: books,
  });
};

const getRandomRecommendationBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { emotion } = req.params;
  const books = await Book.find({ emotions: { $in: [emotion] } });

  const randomIndex = Math.floor(Math.random() * books.length);

  const randomBook = books[randomIndex];
  console.log(
    "🚀 ~ getRandomRecommendationBook ~ randomBook:",
    randomBook.isbn
  );

  let imageURL = "";

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${randomBook.isbn}`
    );
    const data = await response.json();

    imageURL = data.items[0].volumeInfo.imageLinks.thumbnail;
  } catch (error) {
    //La peticion que se ha hecho es incorrecta en principio
    res.status(400).json({
      message: `Error fetching book from Google API: ${error.message}`,
    });
  }

  // Convertir el documento de Mongoose en un objeto plano
  const bookObject = randomBook.toObject();

  // Agregar la URL de la imagen al objeto plano
  bookObject.imageURL = imageURL;

  res.status(200).json({
    message: "Query executed successfully",
    results: [ bookObject ],
  });
};

const postBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, isbn, price, description, emotions } = req.body;

  try {
    const createdBook = await Book.create({
      title,
      isbn,
      price,
      description,
      emotions,
    });

    res.status(201).json({
      message: "Book created successfully",
      bookId: createdBook._id,
    });
  } catch (error) {
    //La peticion que se ha hecho es incorrecta en principio
    res.status(400).json({
      message: `Could not create the book. Validation faile ${error.message}`,
    });
  }
};

module.exports = {
  getBooks,
  getRecommendationBooks,
  getRandomRecommendationBook,
  postBook,
};
