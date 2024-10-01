const { Schema, model } = require("mongoose");


const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50
  },
  isbn: {
    type: String,
    required: true,
    match: /^[0-9]{13}$/,
  },

  price:{
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        // Validar que el número tenga como máximo dos decimales
        return /^\d+(\.\d{1,2})?$/.test(value);
      },
      message: props => `${props.value} no es un precio válido. Debe tener como máximo dos decimales.`
    }
  },

  description:{
    type: String,
    required: true,
    maxLength: 4000
  },

  emotions: {
    type: [String],
    required: true,
    enum: ['Inspiration', 'Curiostity', 'Espacism', 'Nostalgia', 'Happiness', 'Sadness']
  }

});

const Book = model("Book", bookSchema);

// Exporta un único recurso
module.exports = Book;
