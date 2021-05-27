const _ = require("lodash");
const axios = require("axios");
const fs = require("fs");

//inportacion de la constantes
const constantes = require("./constantes");


function main() {
    axios.get(constantes.dataAxios.routeApi)
        .then(res => {
            console.log(res.data.data);
            const data = res.data.data;
            write(data);
        })
        .catch(err=>{console.log(err)});
}

// async function main() {
//     const res = await axios.get(constantes.dataAxios.routeApi).catch(err=>{return null});
//     console.log(res);
//     write(res.data.data);
// }

function write(data) {
    // Crea un archivo donde guarda el Json modificado
    fs.writeFile(
        constantes.saveJson.route,
        JSON.stringify(data,false,4),
        constantes.saveJson.utf8,
        (err) => {
            if (err) throw err;
            console.log(constantes.saveJson.SaveMessage);
        }
    );
}

main();

module.exports = main;