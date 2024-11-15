const cerrar_sesion = () => {
    let data = new FormData();
    data.append("metodo", "cerrar_sesion");

    fetch("./app/controller/Login.php", {
        method: "POST",
        body: data
    })
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se cerrará tu sesión, ¿quieres continuar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                
                Swal.fire({
                    title: '¡Sesión cerrada!',
                    text: respuesta[1],
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    window.location = "login";  
                });
            } else {
                
                Swal.fire(
                    'Cancelado',
                    'Tu sesión no ha sido cerrada.',
                    'info'
                );
            }
        });
    });
};

$("#btn_cerrar").on('click', () => {
    cerrar_sesion();
});
