//inportacion de la libreria lodash
const constantes = require("./constantes");

//inportacion de la libreria lodash
const _ = require("lodash");

//inportacion de la libreria fs
const fs = require("fs");

function modify(data) {
    const newData = data.map((element) => {
        //extraen los elementos
        const auxInputParams = element.controls.filter((x) => {
            return x.name === constantes.typeData.input;
        });
        const auxOutputParams = element.controls.filter((x) => {
            return x.name === constantes.typeData.output;
        });

        // Se comprueba si hay elementos Input
        const hasInput = hasElement(auxInputParams);
        // Se comprueba si hay elementos Output
        const hasOutput = hasElement(auxOutputParams);

        //eliminar de controls los input
        auxInputParams.forEach((input) => {
            _.pull(element.controls, input);
        });
        //eliminar de controls los output
        auxOutputParams.forEach((output) => {
            _.pull(element.controls, output);
        });

        //Da la estructura requerida para los datos de input
        const inputParams = auxInputParams.map((input) => {
            return formato(input);
        });

        //Da la estructura requerida para los datos de output
        const outputParams = auxOutputParams.map((output) => {
            return formato(output);
        });

        //modificaciones en los nombres y diferentes casos
        element.name = constantes.name;
        element.snakeCaseName = _.snakeCase(element.name);
        element.camelCaseName = _.camelCase(element.name);
        element.kebabCaseName = _.kebabCase(element.name);

        //Se anade el elemtoo components al Json
        element.components = {
            inputParams,
            outputParams,
            hasInput,
            hasOutput,
        };

        return element;
    });

    // Crea un archivo donde guarda el Json modificado
    fs.writeFile(
        constantes.saveJson.route,
        JSON.stringify(newData),
        constantes.saveJson.utf8,
        (err) => {
            if (err) throw err;
            console.log(constantes.saveJson.SaveMessage);
        }
    );
}

function hasElement(data) {
    //* Comprueba si el objeto esta vacio o no en caso de que este vacio devuelve TRUE y si tiene elementos FALSE
    var aux = Object.entries(data).length === 0;
    var isFull;
    if (aux) {
        //objeto vacio
        isFull = false;
    } else {
        //objeto lleno
        isFull = true;
    }
    return isFull;
}

function formato(data) {
    var name = data.properties.find((x) => {
        return x.name === constantes.formatData.name;
    });
    var value = data.properties.find((x) => {
        return x.name === constantes.formatData.value;
    });
    var type = data.properties.find((x) => {
        return x.name === constantes.formatData.type;
    });
    return {
        name: name.value,
        value: value.value,
        type: type.value,
    };
}

module.exports = modify;