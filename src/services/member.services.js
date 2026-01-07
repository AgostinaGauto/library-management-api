const Member = require('../models/member');

const registerMember = async (data) => { // funcion que recibe datos
    const existingMember = await Member.findOne({ where: {dni: data.dni}}); // verifica si existe un usuario con determinado dni

    if(existingMember){ // si existe, lanza un error
        throw new Error('SOCIO_EXISTENTE');
    }

    const member = await Member.create({ // en caso de que no exista, se procede a crear el socio con sus datos
        dni: data.dni,
        name: data.name,
        birthdate: data.birthdate,
        address: data.address,
        phone: data.phone,
        email: data.email

    });

    return member; // devuelve el socio
};


const getAllMembers = async () => {
    return await Member.findAll(); // devuelve todos los registros de socios en la bd 

};

const getMemberById = async (memberId) =>{ // funcion que recibe un id
    const member = await Member.findByPk(memberId); // busca un registro en la bd que coincida con ese id

    if(!member){ // si no se ha encontrado dicho socio, lanza un error
        throw new Error('SOCIO_NO_ENCONTRADO');
    }

    return member; // devuelve el socio encontrado
};

const updateMember = async (memberId, data) => { // funcion que recibe un id y un objeto de datos
    const member = await getMemberById(memberId); // obtiene un registro en la bd con dicho id

     if(data.dni && data.dni !== member.dni){ // verifica duplicidad del dni con otro registro en la bd
        const existingMember = await Member.findOne({where: { dni: data.dni }});

        if(existingMember){
            throw new Error('SOCIO_EXISTENTE');
        }
    }
    
    await member.update(data); // actualiza el socio con sus nuevos datos
    return member; // devuelve el socio
};

const deleteMember = async (memberId) => { 
    const member = await getMemberById(memberId); // busca un registro con el id recibido

    if(!member){
        throw new Error('SOCIO_NO_ENCONTRADO')

    }

    await member.destroy(); // elimina el socio
};

const isMinor = async (birthdate) => { // funcion que recibe una fecha

    const today = new Date(); // crea un objeto con la fecha actual

    const birth = new Date(birthdate); // convierte la fecha recibida en un objeto Date. Permite operar con año, mes y dia

    let age = today.getFullYear() - birth.getFullYear(); // resta el año de nacimiento al año actual

    const m = today.getMonth() - birth.getMonth(); // calcula la diferencia de meses
   
    // esta funcion verifica si el cumpleaños todavia no ocurrio este año
    // o si estamos en el mes de cumpleaños pero el dia aun no llego
    if(m < 0 || (m === 0 && today.getDate() < birth.getDate())){

        age--; // si todavia no cumplio años, se resta 1 a la edad. Ahora la edad es correcta.

    }

    return age < 18; // devuelve true si la edad es menor a 18. False si la edad es 19 o mas
};

module.exports = {
  registerMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  isMinor
}

