const { Repair, Book, sequelize } = require('../models');

const startRepair = async (bookId, reason) => { // funcion que recobe dos parametros
    const transaction = await sequelize.transaction(); // inicia una transaccion, si algo falla se revierte toda la operacion

    try {
        const book = await Book.findByPk(bookId); // busca el libro por su id
        if (!book) { // valida su existencia
            throw new Error('LIBRO_NO_ENCONTRADO');

        }

        if (book.state === 'PRESTADO') { // valida si el libro esta prestado
            throw new Error('LIBRO_PRESTADO');

        }

        if (book.state === 'EN_REPARACION') { // valida si el libro esta en reparacion
            throw new Error('LIBRO_EN_REPARACION');

        }

        const repair = await Repair.create({ // crea una reparacion. Le pasa el id del libro, fecha de entrada y rason
            bookId,
            entryDate: new Date(),
            reason
        }, { transaction }); // usa la transaccion

        await book.update( // actualizamos el estado del libro 
            { state: 'EN_REPARACION' },
            { transaction }
        );

        await transaction.commit(); // finaliza y guarda definitivamente la reparacion
        return repair; // evuelve la reparacion creada al controlador

    } catch (error) {
        await transaction.rollback(); // si ocurrio un error en el proceso, revierte todos los cambios
        throw error; // lanza el error al controlador

    }
};


const updateRepair = async (repairId) => {
    const transaction = await sequelize.transaction(); // inicia una transaccion

    try {
        const repair = await Repair.findByPk(repairId); // busca la reparacion por su id
        if (!repair) { // valida la existencia de la reparacion
            throw new Error('REPARACION_NO_ENCONTRADA');
        }

        if (repair.dischargeDate) { // valida si la reparacion esta finalizada segun tenga fecha de salida
            throw new Error('REPARACION_YA_FINALIZADA');
        }

        const book = await Book.findByPk(repair.bookId); // busca el libro de la reparacion por su id

        await repair.update( // si la reparacion que buscamos no tiene fecha de finalizacion, se le agrega una
            { dischargeDate: new Date() },
            { transaction }
        );

        await book.update( // y actualizamos el estado del libro
            { state: 'EN_BIBLIOTECA' },
            { transaction }
        );

        await transaction.commit(); // guardamos los cambios hechos
        return repair; // devuelve la reparacion actualizada al controlador

    } catch (error) {
        await transaction.rollback(); // revierte los cambios hechos en caso de que haya ocurrido un error en el proceso
        throw error; // lanza el error al controlador

    }
};

const deleteRepair = async (repairId) => {
    const transaction = await sequelize.transaction(); 

    try {
        const repair = await Repair.findByPk(repair.bookId); // busca la reparacion por su id
        if (!repair) { // valida su existencia
            throw new Error('REPARACION_NO_ENCONTRADA');

        }

        const book = await Book.findByPk(repair.bookId); // busca el libro de la reparacion por su id

        await repair.destroy({ transaction }); // borra el registro de reparacion

        await book.update( // actualiza el estado del libro
            { state: 'EN_BIBLIOTECA' },
            { transaction }

        );

        await transaction.commit(); // guarda los cambios

    } catch (error) {
        await transaction.rollback();
        return error;

    }
};

const getActiveRepairs = async () => {
    return await Repair.findAll({ // busca todas las reparaciones activas, es decir, que no tengan fecha de salida
        where: { dischargeDate: null }

    });

};

module.exports = {
    startRepair,
    updateRepair,
    deleteRepair,
    getActiveRepairs
};