const {
    getAvailableBooks,
    createLoan,
    returnLoan: returnLoanService,
    deleteLoan,

} = require('../services/loan.service');


const {
    successResponse,
    errorResponse

} = require('../utils/responses');

exports.getBooks = async (req, res) => {
    try {
        const books = await getAvailableBooks(); // llama al service para obtener libros disponibles
        return successResponse(res, 200, books); // lanza un mensaje de exito llamando al utils de exito
        
    } catch (error) {
        return errorResponse(res, 500, 'Error al obtener los libros disponibles');
        
    }
};

exports.create = async (req, res) => {
    try {
        const { memberId, bookId } = req.body;

        const loan = await createLoan(memberId, bookId);
        return successResponse(res, 201, loan);
        
    } catch (error) {
        switch (error.message) {
            case 'SOCIO_NO_ENCONTRADO':
                return errorResponse(res, 404, 'Socio no encontrado');

            case 'LIBRO_NO_ENCONTRADO':
                return errorResponse(res, 404, 'Libro no encontrado');

            case 'LIBRO_NO_DISPONIBLE':
                return errorResponse(res, 400, 'Libro no disponible');

            default: 
                return errorResponse(res, 500, 'Error al crear el prestamo');
        }  
    }
};

exports.returnLoan = async (req, res) => {
    try {
        const { id } = req.params;

        const loan = await returnLoanService(id);
        return successResponse(res, 200, loan);
        
    } catch (error) {

        switch (error.message){
            case 'PRESTAMO_NO_ENCONTRADO':
                return errorResponse(res, 404, 'Prestamo no encontrado');

            case 'PRESTAMO_YA_DEVUELTO':
                return errorResponse(res, 400, 'El prestamo ya fue devuelto');

            default:
                return errorResponse(res, 500, 'Error al registrar la devolución');

        } 
    }
};


exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteLoan(id);
        return successResponse(res, 200, {
            message: 'Prestamo eliminado correctamente'

        });
        
    } catch (error) {
        switch (error.message) {
            case 'PRESTAMO_NO_ENCONTRADO':
                return errorResponse(res, 404, 'Préstamo no encontrado');

            case 'PRESTAMO_VIGENTE':
                return errorResponse(res, 400, 'No se puede eliminar un prestamo vigente');

            default:
                return errorResponse(res, 500, 'Error al eliminar el prestamo');
        } 
    }
};


