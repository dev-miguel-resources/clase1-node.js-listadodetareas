// en esta clase de ts me traigo las funcionalidades de por-hacer y capturo los parametros
const argv = require('./config/yargs').argv;
const colors = require('colors');

const porHacer = require('./por-hacer/por-hacer'); //me traigo las funcionalidades del archivo por-hacer


let comando = argv._[0];

switch (comando) {

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':

        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log('========Por Hacer========='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('=========================='.green);
        }


        break;

    case 'actualizar':

        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado); //recibo los datos de por hacer
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log('Comando no es reconocido.');

}