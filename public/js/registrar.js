const iniciar_registro = () => {
    if($("#nombre").val() === "" || $("#apellido").val() === "" || $("#usuario").val() === "" || $("#password").val() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Campos Vacíos',
            text: 'Por favor, complete todos los campos.',
        });
        return;
    }

    let email = $("#usuario").val();
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Correo Inválido',
            text: 'Por favor, ingrese un correo electrónico válido.',
        });
        return;
    }

    let password = $("#password").val();
    if (password.length < 8) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña Corta',
            text: 'La contraseña debe tener al menos 8 caracteres.',
        });
        return;
    }

    let data = new FormData();
    data.append("nombre", $("#nombre").val());
    data.append("apellido", $("#apellido").val());
    data.append("usuario", $("#usuario").val());
    data.append("password", $("#password").val());
    data.append("metodo", "iniciar_registro");

    fetch("./app/controller/Registro.php", {
        method: "POST",
        body: data
    }).then(respuesta => respuesta.json())
    .then(respuesta => {
        if(respuesta[0] == 1) {
            Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso',
                text: respuesta[1],
            }).then(() => {
                window.location = "login";
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error en el Registro',
                text: respuesta[1],
            });
        }
    });
}

$("#btn_registro").on('click', () => {
    iniciar_registro();
});

document.getElementById('btn_regresar').addEventListener('click', function(e) {
    e.preventDefault();

    Swal.fire({
        title: '¿Estás seguro?',
        text: "No has guardado tu registro. ¿Quieres regresar a inicio de sesión?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, regresar',
        cancelButtonText: 'No, quedarme aquí',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'login';
        }
    });
});
