const {
    registerMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember,

} = require('../services/member.services');

const {
    successResponse,
    errorResponse
} = require('../utils/responses');


exports.register = async (req, res) => {
    try {
        const member = await registerMember(req.body);
        return successResponse(res, 201, member);
        
    } catch (error) {
        if(error.message === 'SOCIO_EXISTENTE'){
            return errorResponse(res, 400, 'El socio ya existe');
        }

        return errorResponse(res, 500, 'Error al registrar el socio');
        
    }
};


exports.getAll = async (req, res) => {
    try {
        const members = await getAllMembers();
        return successResponse(res, 200, members);
        
    } catch (error) {
        return errorResponse(res, 500, 'Error al obtener socios');
        
    }
};

exports.getById = async (req, res) => {
    try {
        const member = await getMemberById(req.params.id);
        return successResponse(res, 200, member);
        
    } catch (error) {
        if(error.message === 'SOCIO_NO_ENCONTRADO'){
            return errorResponse(res, 404, 'Socio no encontrado');
        }

        return errorResponse(res, 500, 'Error al obtener el socio');
        
    }
};


exports.update = async (req, res) => {
    try {
        const member = await updateMember(req.params.id, req.body);
        return successResponse(res, 200, member);
        
    } catch (error) {
        if(error.message === 'SOCIO_EXISTENTE'){
            return errorResponse(res, 400, error.message);

        }

        return errorResponse(res, 500, 'Error al actualizar el socio');
  
    }
};

exports.remove = async (req, res) => {
    try {
        await deleteMember(req.params.id);
        return successResponse(res, 200, {message: 'Socio eliminado correctamente'});
        
    } catch (error) {
        if(error.message === 'SOCIO_NO_ENCONTRADO'){
            return errorResponse(res, 404, 'Socio no encontrado');

        }

        return errorResponse(res, 500, 'Error al eliminar el socio');
        
    }
};