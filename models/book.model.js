const { Schema, model } = require("mongoose");


const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true,
    match: /^[0-9]{13}$/,
  },

  price:{
    type: Number,
    required: true
  },

  description:{
    type: String,
    required: true
  },

  emotions: {
    type: [String],
    required: true
  }

});

const Book = model("Book", bookSchema);

// Exporta un único recurso
module.exports = Book;
