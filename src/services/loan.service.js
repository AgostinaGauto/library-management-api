const { Loan, LoanDetail, Book, Member, sequelize } = require('../models/index');

const getAvailableBooks = async () => {
    return await Book.findAll({ // obtiene todos los libros 
        where: {
            state: 'EN_BIBLIOTECA' // filtra solo los libros que esten disponibles
        }

    });
};

const createLoan = async (memberId, bookId) => { // funcion que crea un prestamo para un socio y un libro
    const transaction = await sequelize.transaction();

    try {
        // validamos socio
        const member = await Member.findByPk(memberId); // busca el socio por su id
        if (!member) { // si no existe, corta el proceso
            throw new Error('SOCIO_NO_ENCONTRADO'); // se lanza un error de negocio

        }

        // validamos libro
        const book = await Book.findByPk(bookId); // busca el libro
        if (!book) { // valida su existencia
            throw new Error('LIBRO_NO_ENCONTRADO');

        }

        if (book.state !== 'EN_BIBLIOTECA') { // no se puede prestar un libro que ya esta prestado
            throw new Error('LIBRO_NO_DISPONIBLE');

        }

        // crear prestamo
        const loan = await Loan.create({ // insertamos un registro en la tabla loan. 
            memberId, // asociado a tal socio
            loanDate: new Date() // y fecha del prestamo

        }, { transaction });

        // crear detalle
        await LoanDetail.create({ // crea un detalle con el id del prestamo y el id del libro
            loanId: loan.loanId,
            bookId

        }, { transaction });

        // actualizar estado del libro 
        await book.update(
            { state: 'PRESTADO' }, // cambia el estado del libro
            { transaction }

        );

        await transaction.commit(); // guarda todo los cambios
        return loan; // devuelve el prestamo creado

    } catch (error) {
        await transaction.rollback(); // revierte todos los cambios
        throw error; // envia el error al controlador. En controlador decide que respuesta enviar

    }
};

const returnLoan = async (loanId) => {
    const transaction = await sequelize.transaction(); // inicia una transaccion en la base de datos

    try {
        const loan = await Loan.findByPk(loanId); // busca el prestamo en la tabla

        if (!loan) { // valida que el prestamo exista
            throw new Error('PRESTAMO_NO_ENCONTRADO');

        }

        if (!loan.returnDate) { // si ya tiene fecha de devolucion, no se puede devolver otra vez
            throw new Error('PRESTAMO_YA_DEVUELTO');

        }

        // obtener detalle del prestamo
        const detail = await LoanDetail.findOne({ // busca el detalle asociado al prestamo
            where: { loanId }
        });

        if (!detail) {
            throw new Error('DETALLE_PRESTAMO_NO_ENCONTRADO');
        }


        // obtener el libro asociado
        const book = await Book.findByPk(detail.bookId); // busca el libro que fue prestado
        // es necesario para poder cambiar su estado


        // actualizar prestamo
        await loan.update(
            {
                returnDate: new Date(), // registra la fecha de devolucion
                state: 'DEVUELTO' // cambia el estado del prestamo
            },
            { transaction } // usa la transaccion
        );

        // actualizar libro
        await book.update(
            { state: 'EN_BIBLIOTECA' }, // marca el libro como disponible nuevamente
            { transaction } // usa la transaccion

        );

        await transaction.commit(); // guarda todos los cambios. Confima que todo salio bien
        return loan; // devuelve el prestamo actualizado

    } catch (error) { // captura cualquier error
        await transaction.rollback(); // revierte todos los cambios
        throw error; // pasa los errores al controlador. El controlador decide el HTTP status y el mensaje


    }
};

const deleteLoan = async (loanId) => {
  const transaction = await sequelize.transaction();

  try {
    const loan = await Loan.findByPk(loanId);
    if (!loan) {
      throw new Error('PRESTAMO_NO_ENCONTRADO');
    }

    if (!loan.returnDate) {
      throw new Error('PRESTAMO_VIGENTE');
    }

    await LoanDetail.destroy(
      { where: { loanId } },
      { transaction }
    );

    await loan.destroy({ transaction });

    await transaction.commit();

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};


module.exports = {
    getAvailableBooks,
    createLoan,
    returnLoan,
    deleteLoan
};

