const mensaje_error = (msj) => {
    Swal.fire({
        title: "Error!",
        text: msj,
        icon: "warning",
        confirmButtonText: "Aceptar"
    });
}

const mensaje_sesion_iniciada = (msj) => {
    Swal.fire({
        title: "¡Sesión Iniciada!",
        text: msj,
        icon: "success",
        confirmButtonText: "Aceptar"
    });
}

const iniciar_sesion = () => {
    const email = $("#usuario").val();
    const password = $("#password").val();

    if (email === "" || password === "") {
        mensaje_error("Por favor, completa todos los campos.");
        return;
    }

    if (password.length < 8) {
        mensaje_error("La contraseña debe tener al menos 8 caracteres.");
        return;
    }

    let data = new FormData();
    data.append("usuario", email);
    data.append("password", password);
    data.append("metodo", "iniciar_sesion");

    fetch("./app/controller/Login.php", {
        method: "POST",
        body: data
    })
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        if (respuesta[0] == 1) {
            mensaje_sesion_iniciada(respuesta[1]);
            window.location = "inicio";
        } else {
            mensaje_error(respuesta[1]);
        }
    });
}

$("#btn_iniciar").on('click', () => {
    iniciar_sesion();
});
