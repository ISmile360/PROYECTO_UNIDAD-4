const consulta = () => {
    let data = new FormData();
    data.append("metodo", "obtener_datos");
    fetch("./app/controller/Productos.php", {
        method: "POST",
        body: data
    }).then(respuesta => respuesta.json())
    .then(respuesta => {
        let contenido = ``,
            i = 1;
        respuesta.map(producto => {
            contenido += `
                <tr>
                    <th>${i++}</th>
                    <td>${producto['producto']}</td>
                    <td>${producto['precio']}</td>
                    <td>${producto['unidades']}</td>
                    <td>
                        <button type="button" class="btn btn-warning" onclick="precargar(${producto['id_producto']})"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button type="button" class="btn btn-danger" onclick="eliminar(${producto['id_producto']})"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>
            `;
        });
        $("#contenido_producto").html(contenido);
        $('#myTable').DataTable();
    });
};

const precargar = (id) => {
    let data = new FormData();
    data.append("id_producto", id);
    data.append("metodo", "precargar_datos");
    fetch("./app/controller/Productos.php", {
        method: "POST",
        body: data
    }).then(respuesta => respuesta.json())
    .then(respuesta => {
        $("#edit_producto").val(respuesta['producto']);
        $("#edit_precio").val(respuesta['precio']);
        $("#edit_unidades").val(respuesta['unidades']);
        $("#id_prodcuto_act").val(respuesta['id_producto']);
        $("#editarModal").modal('show');
    });
};

consulta();

const actualizar = () => {
    
    const producto = $("#edit_producto").val().trim();
    const precio = $("#edit_precio").val().trim();
    const unidades = $("#edit_unidades").val().trim();

    
    if (producto === "" || precio === "" || unidades === "") {
        Swal.fire({
            title: '¡Error!',
            text: 'Todos los campos son obligatorios.',
            icon: 'error',
        });
        return;  
    }

    
    let data = new FormData();
    data.append("id_producto", $("#id_prodcuto_act").val());
    data.append("producto", producto);
    data.append("precio", precio);
    data.append("unidades", unidades);
    data.append("metodo", "actualizar_datos");

    
    fetch("./app/controller/Productos.php", {
        method: "POST",
        body: data
    }).then(respuesta => respuesta.json())
    .then(respuesta => {
        if (respuesta[0] == 1) {
            Swal.fire('¡Éxito!', respuesta[1], 'success');
            consulta();  
            $("#editarModal").modal('hide');  
        } else {
            Swal.fire('¡Error!', respuesta[1], 'error');
        }
    });
};


const agregar = () => {
   
    const producto = $("#producto").val().trim();
    const precio = $("#precio").val().trim();
    const unidades = $("#unidades").val().trim();

    
    if (producto === "" || precio === "" || unidades === "") {
        Swal.fire({
            title: '¡Error!',
            text: 'Todos los campos son obligatorios.',
            icon: 'error',
        });
        return;  
    }

   
    let data = new FormData();
    data.append("producto", producto);
    data.append("precio", precio);
    data.append("unidades", unidades);
    data.append("metodo", "insertar_datos");

    
    fetch("./app/controller/Productos.php", {
        method: "POST",
        body: data
    }).then(respuesta => respuesta.json())
    .then(respuesta => {
        if (respuesta[0] == 1) {
            Swal.fire('¡Éxito!', respuesta[1], 'success');
            consulta(); 
            $("#agregarModal").modal('hide');  
        } else {
            Swal.fire('¡Error!', respuesta[1], 'error');
        }
    });
};


const eliminar = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Quieres eliminar el producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let data = new FormData();
            data.append("id_producto", id);
            data.append("metodo", "eliminar_datos");
            fetch("./app/controller/Productos.php", {
                method: "POST",
                body: data
            }).then(respuesta => respuesta.json())
            .then(respuesta => {
                if (respuesta[0] == 1) {
                    Swal.fire('¡Eliminado!', respuesta[1], 'success');
                    consulta();
                } else {
                    Swal.fire('¡Error!', respuesta[0], 'error');
                }
            });
        }
    });
};


$('#btn_actualizar').on('click', () => {
    actualizar();
});


$('#btn_agregar').on('click', () => {
    agregar();
});
