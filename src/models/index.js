// este archivo define todas las relaciones entre los modelos

const sequelize = require('../config/database');
const User = require('./user');
const Member = require('./member');
const Book = require('./book');
const Loan = require('./loan');
const LoanDetail = require('./loanDetail');
const Repair = require('./repair');


// ---------------- relaciones -----------------

// member -> loan
// un socio puede tener muchos prestamos
Member.hasMany(Loan, {
    foreignKey: 'memberId'

});

// cada prestamo pertenece a un solo socio
Loan.belongsTo(Member, {
    foreignKey: 'memberId'

});

// loan -> loanDetail
// un prestamo puede tener muchos detalles
Loan.hasMany(LoanDetail, {
    foreignKey: 'loanId'

});

// cada detalle pertenece a un prestamo
LoanDetail.belongsTo(Loan, {
    foreignKey: 'loanId'

});

// book -> loanDetail
// un libro puede aparecer en muchos detalles de prestamo
Book.hasMany(LoanDetail, {
    foreignKey: 'bookId'

});

// cada detalle hace referencia a un libro especifico
LoanDetail.belongsTo(Book, {
    foreignKey: 'bookId'

});


// un libro puede tener muchas reparaciones
Book.hasMany(Repair, {
    foreignKey: 'bookId'
});

// una reparación pertenece a un solo libro
Repair.belongsTo(Book, {
    foreignKey: 'bookId'
});

module.exports = {
    sequelize,
    User,
    Member,
    Book,
    Loan,
    LoanDetail,
    Repair
};
