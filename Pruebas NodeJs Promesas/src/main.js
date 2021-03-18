//inportacion de la constantes
const constantes = require("./constantes");

//inportacion de la libreria lodash
const _ = require("lodash");

//inportacion de la libreria axios
const axios = require("axios");

//inportacion de la libreria fs
const fs = require("fs");



function main() {
    const api=axios.get(constantes.dataAxios.routeApi, {
        responseType: 'json'
    });

}

function write(data) {
    // Crea un archivo donde guarda el Json modificado
    fs.writeFile(
        constantes.saveJson.route,
        JSON.stringify(data),
        constantes.saveJson.utf8,
        (err) => {
            if (err) throw err;
            console.log(constantes.saveJson.SaveMessage);
        }
    );
}


module.exports = main;