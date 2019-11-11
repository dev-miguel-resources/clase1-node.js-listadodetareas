const fs = require('fs'); //aqui creo mis funcionalidades a exportar

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => { //en ese archivo escribo la data
        if (err) throw new Error('No se pudo grabar', err);
    });

}

const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json'); //trae la data del archivo

    } catch (error) {
        listadoPorHacer = [];
    }

}



const crear = (descripcion) => {

    cargarDB(); //traigo los datos

    let porHacer = {
        descripcion,
        completado: false //por defecto no esta completado
    };

    listadoPorHacer.push(porHacer); //guardo el objeto con la descripcion por parametro y su completado

    guardarDB(); //guardo la data en el archivo

    return porHacer;

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer; //traigo el listado luego de cargar la data
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado; //actualizo el estado de esa tarea si la encontró
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => { //tengo dudas en el borrar
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion); //filtro esa en especial que sea distinta a las demas

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado; //el nuevo listado lo almaceno en el listado por hacer
        guardarDB();
        return true;
    }

}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}