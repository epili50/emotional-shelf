// necesitamos el módulo de terceros dotenv para poder cargar la variable de entorno
const dotenv = require('dotenv');
dotenv.config();
const API_URL = process.env.API_URL;


it('should return the list of books if we make a GET request to /api/books', async ()=> {

    // Arrange
    const url = `${API_URL}/books`;

    // Act
    const response = await fetch(url);


    // Assert
    // Comprobar que nos devuelve un código 200 la petición HTTP GET
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200); 
    // Comprobar si el valor de la propiedad "message" es "Query executed successfully"
    const data = await response.json();
    expect(data.message).toBe("Query executed successfully");
    // Comprobar si existe el array 'results' y tiene al menos un elemento
    expect(data.results.length).toBeGreaterThan(0);
});

it('should return only one book if we make a GET request to /api/books/Sadness, with this emotion and having a URL Image', async ()=> {
    
    const url = `${API_URL}/books/recommendations/Sadness/random`;

    const response = await fetch(url);
    const data = await response.json();

    // el código de respesta es 200
    expect(response.status).toBe(200); 

    // si el "message" es el esperado
    expect(data.message).toBe("Query executed successfully");

    // si el array de books (results) solamente hay uno
    expect(data.results).toHaveLength(1);

    //si en la propiedad emotions esta la emoción elegida: Sadness
    expect(data.results[0].emotions).toContain('Sadness')

    //si la imagen que se trae de la api de google libros tiene algun valor (o se pone cualquiero otra por defecto)
    expect(data.results[0].imageURL).toBeTruthy();

});

it('should return an error if we make a GET request to /api/books/recommendaion/:emotion/random with a wrong emotion value', async ()=> {
    const url = `${API_URL}/books/recommendations/Wrong/random`;

    const response = await fetch(url);
    const data = await response.json();

    expect(response.ok).toBe(false);
    expect(response.status).toBe(400);
    expect(data).not.toHaveProperty("results")
})