const {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook} = require('../services/book.services'); // importamos las funciones del service de libro

const {
    successResponse,
    errorResponse } = require('../utils/responses'); // importamos helpers


exports.create = async (req, res) => {
    try {
        const book = await createBook(req.body); // envia los datos del body al service. El service valida y crea el libro
        return successResponse(res, 201, book); // recurso creado correctamente. Devuelve el libro creado.

    } catch (error) { // captura errore lanzados desde el service
        if(error.message === 'LIBRO_EXISTENTE'){
            return errorResponse(res, 400, 'El libro ya existe'); // peticion invalida

        }

        return errorResponse(res, 500, 'Error al crear el libro'); // error generico del servidor
    }
};

exports.getAll = async (req, res) => {
    try {
        const books = await getAllBooks(); // llama al service pra traer todos los libros
        return successResponse(res, 200, books); // devuelve el listado de libros
        
    } catch (error) {
        return errorResponse(res, 500, 'Error al obtener libros');
        
    }
};

exports.getById = async (req, res) => {
    try {
        const book = await getBookById(req.params.id); // obtiene el id desde la url y busca el libro en la bd
        return successResponse(res, 200, book); // devuelve el libro encontrado
        
    } catch (error) {
        if(error.message === 'LIBRO_NO_ENCONTRADO'){
            return errorResponse(res, 404, 'Libro no encontrado');

        }

        return errorResponse(res, 500, 'Error al obtener el libro');        
    }
};


exports.update = async (req, res) => {
    try {
        const book = await updateBook(req.params.id, req.body); // envia id, mas los datos nuevos al service. El service valiuda y actualiza
        return successResponse(res, 200, book); // devuelve el libro actualizado
        
    } catch (error) {
        return errorResponse(res, 500, 'Error al actualizar el libro');
        
    }

};


exports.remove = async (req, res) => {
    try {
        await deleteBook(req.params.id); // llama al service, el service valida el estado antes de borrar el libro
        return successResponse(res, 200, { // devuelve mensaje de exito
            message: 'Libro eliminado correctamente'
        });
        
    } catch (error) {
        if(error.message === 'LIBRO_NO_DISPONIBLE'){
            return errorResponse(res, 400, 'El libro no se puede eliminar');

        }

        return errorResponse(res, 500, 'Error al eliminar el libro');
        
    }
};








