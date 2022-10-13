export function valida(input) {
    const tipoInput = input.dataset.tipo;

    if (validadores[tipoInput]) {
        validadores[tipoInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHtml = '';
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerText=mostrarMensajeDeError(tipoInput, input);
    }
}

const tipoErrores = ["valueMissing", "typeMismatch", "patternMismatch", "customError"]

function mostrarMensajeDeError(tipoInput, input) {

    let mensaje = '';

    tipoErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoInput, error)
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoInput][error]);

            mensaje = mensajeDeError[tipoInput][error];
        }
    });

    return mensaje;

}

const mensajeDeError = {
    nombre: {
        valueMissing: "este campo no puede estar vacio"
    },

    email: {
        valueMissing: "este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },

    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "debe contener un minimo de 6 hasta 12 caracteres, debe contener una letra mayuscula, una minuscula y un número"
    },

    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debe tener al menos 18 años"
    },
     telefono:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch:"el formato requerido es xxxxxxxxxx"
     },

     direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch:"la direccion debe contener entre 10 y 40 caracteres"
     },

     ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch:"la ciudad debe contener entre 10 y 40 caracteres"
     },

     estado:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch:"el estado debe contener entre 10 y 40 caracteres"
     }

}


const validadores = {
    nacimiento: input => validarNacimiento(input)
}
function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";

    if (!mayorEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje)
}

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    console.log(diferenciaFechas < fechaActual)
    return diferenciaFechas < fechaActual;



}