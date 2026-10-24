//DECLARAACION DE CONSTANTES, DE LAS VARIAIBLES DEL FORMULARIO
const form = /** @type {HTMLFormElement} */ (document.getElementById("form-contacto"));
const submitBtn =  /** @type {HTMLButtonElement} */ (document.getElementById("btm-enviar"));

//CREACION DEL EVENTO AL ENVIAR EL FORMULARIO MEDIANTE FUNCION FLEHCA 
form.addEventListener("submit", async (e) => {

    //ASYN PERMITE TRABAJAR CON OPERACIONES ASINCRONAS MIENTRAS EL NAVEGADOR OBITENE RESPUESTA DEL SERICIO EXTERNO,  

    //QUITA EL COMPORTAMIENTO POR DEFECTO DEL ENVIO DEL FORMULARIO
    e.preventDefault();

    //CONSTANTE PARA GUARDAR LA DAT DEL FORMULARIO 
    const formData = new FormData(form);

    //GUARDADO DEL EXTO DEL BOTON
    const textoOriginal = submitBtn.textContent;

    //CAMBIO DEL TEXTO DEL BOTON MIENTRAS SE ENVIA EL MENSAJE
    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    //MANEJO DE ERROR DE CONEXION MEDIANTE BLOQUE TRY/CACTH
    try {

        // ENVIO DEL FORMULARIO AL PROVEEDOR, SE GAURADA LA RESPUESTA EN LA CONST
        const response = await fetch("https://api.web3forms.com/submit", {

            //AWAIT Le indica a JavaScript que espere la respuesta de fetch() antes de continuar con la siguiente línea de esta función.

            method: "POST",
            body: formData
        });

        // CREACION DE LA CONST DATA PARA GUARDAR LA RESPUESTA JSON EN FORMATO JS
        const data = await response.json();
        if (data.success) {
            alert("¡Mensaje enviado correctamente!");
            form.reset();
        } else {
            console.error("Error de Web3Forms:", data.message);
            alert("No pudimos enviar tu mensaje. Intentá nuevamente más tarde.");
        }
    } catch (error) {
        alert("Ocurrió un problema de conexion.Intentá nuevamente.")
    }
    finally {
        submitBtn.textContent = textoOriginal;
        submitBtn.disabled = false;

    }

});