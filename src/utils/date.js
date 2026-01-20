const isMinor = (birthdate) => { // funcion que recibe una fecha

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

module.exports = { isMinor };