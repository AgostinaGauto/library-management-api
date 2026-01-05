const Book = require('../models/book');

const createBook = async (data) => { // funcion asincrona que recibe un objeto con los datos del modelo
        const existingBook = await Book.findOne({ where: { title: data.title }}); // busca si ya existe un libro con el mismo titulo para evitar duplicados

        if(existingBook){ // valida si existe
            throw new Error('LIBRO_EXISTENTE');
        }

        const book = await Book.create({ // crea un nuevo libro en la bd y guarda los datos del libro
            title: data.title,
            editorial: data.editorial,
            editionDate: data.editionDate,
            language: data.language,
            pages: data.pages,
            state: 'EN_BIBLIOTECA' // al crear un libro su estado es por defecto en biblioteca


        });

        return book; // devuelve el libro creado. El controlador decide que enviar al cliente
};

const getAllBooks = async () => { // funcion que devuelve todos los libros de la base de datos
    return await Book.findAll();

};

const getBookById = async (bookId) => { // recibe el id del libro
    const book = await Book.findByPk(bookId); // busca el libro en la bd por su primera key

    if(!book){ // si no existe el libro, lanza error
        throw new Error('LIBRO_NO_ENCONTRADO');
    }

    return book; // devuelve el libro encontrado
};


const updateBook = async (bookId, data) => { // recibe el id y un objeto con los demas datos del libro
    const book =  await getBookById(bookId); // reutilizamos la funcion que definimos anteriormente

    await book.update(data);  // actualiza los campos del libro
    

    return book; // devuelve el libro actualizado
}; 

const deleteBook = async (bookId) => { // recibe el id del libro
    const book = await getBookById(bookId); // busca el libro llamando nuevamente a la funcion getBookById

    if(book.state !== 'EN_BIBLIOTECA'){ // solo se permite borrar libros que esten en biblioteca
                                        // para evitar borrar libros que esten prestados o en reparacion
        throw new Error('LIBRO_NO_DISPONIBLE');

    }
    
    await book.destroy(); // si el libro se encuentra en la biblioteca, se procede a borrar de la bd
};

const changeBookState = async (bookId, newState) => { // recibe el id del libro y el estado
    const book = await getBookById(bookId); // obtiene el libro por id

    await book.update({state: newState}); // actualiza el estado del libro

    return book; // devuelve el libro con el estado actualizado
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    changeBookState
};