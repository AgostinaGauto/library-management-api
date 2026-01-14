const { startRepair, 
        updateRepair,
        deleteRepair,
        getActiveRepairs

} = require('../services/repair.services');

const { successResponse, errorResponse } = require('../utils/responses');


exports.start = async (req, res) => {
    try {

        const { bookId, reason } = req.body
        const repair = await startRepair(bookId, reason);
        return successResponse(res, 200, repair);
        
    } catch (error) {
        switch (error.message) {
            case 'LIBRO_NO_ENCONTRADO':
                return errorResponse(res, 404, 'Libro no encontrado');
            
            case 'LIBRO_PRESTADO':
                return errorResponse(res, 400, 'Libro prestado');

            case 'EN_REPARACION':
                return errorResponse(res, 400, 'El libro ya está en reparación');

            default:
                return errorResponse(res, 500, 'Error al crear la reparación')
        }
    }
};


exports.remove = async (req, res) => {
    try {

        await deleteRepair(req.params.id);
        return successResponse(res, 200, 'Reparacion eliminada correctamente');
        
    } catch (error) {

        if(error.message === 'REPARACION_NO_ENCONTRADA'){
            return errorResponse(res, 404, 'Reparación no encontrada');

        }

        return errorResponse(res, 500, 'Error al eliminar la reparacion');  
    }
};


exports.update = async (req, res) => {
    try {
        const repair = await updateRepair(req.params.id);
        return successResponse(res, 200, 'Reparación actualizada con exito');
        
    } catch (error) {

        switch (error.message) {
            case 'REPARACION_NO_ENCONTRADA':
                return errorResponse(res, 404, 'Reparación no encontrada');

            case 'REPARACIÓN_YA_FINALIZADA':
                return errorResponse(res, 400, 'La reparación ya fue actualizada');

            default:
                return errorResponse(res, 500, 'Error al actualizar la reparación');
        }  
    }
};


exports.getActive = async (req, res) => {
    try {
        const repairs = await getActiveRepairs();

        return successResponse(res, 200, repairs);
        
    } catch (error) {
        return errorResponse(res, 500, 'Error al obtener las reparaciones activas');
        
    }
};



