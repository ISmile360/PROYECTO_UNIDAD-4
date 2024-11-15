<?php
require_once '../config/conexion.php';

class Registro extends Conexion {
    public function iniciar_registro(){
    
        if(empty($_POST['nombre']) || empty($_POST['apellido']) || empty($_POST['usuario']) || empty($_POST['password'])) {
            echo json_encode([0, "Todos los campos son obligatorios."]);
            return;
        }

        
        if (!filter_var($_POST['usuario'], FILTER_VALIDATE_EMAIL)) {
            echo json_encode([0, "El formato del correo electrónico no es válido."]);
            return;
        }

        if (strlen($_POST['password']) < 8) {
            echo json_encode([0, "La contraseña debe tener al menos 8 caracteres."]);
            return;
        }

        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $usuario = $_POST['usuario'];
        $password = $_POST['password'];

        $consulta = $this->obtener_conexion()->prepare("SELECT * FROM t_usuario WHERE usuario = :usuario");
        $consulta->bindParam(":usuario", $usuario);
        $consulta->execute();
        $datos = $consulta->fetch(PDO::FETCH_ASSOC);

        if(!$datos){
            $insercion = $this->obtener_conexion()->prepare("INSERT INTO t_usuario (nombre, apellido, usuario, password) VALUES(:nombre, :apellido, :usuario, :password)");
            $insercion->bindParam(":nombre", $nombre);
            $insercion->bindParam(":apellido", $apellido);
            $insercion->bindParam(":usuario", $usuario);
            $pass = password_hash($password, PASSWORD_BCRYPT);
            $insercion->bindParam(":password", $pass);
            
            if($insercion->execute()){
                echo json_encode([1, "Usuario registrado con éxito!"]);
            } else {
                echo json_encode([0, "Error en las credenciales de acceso!"]);
            }
        } else {
            echo json_encode([0, "Error, usuario ya registrado!"]);
        }
    }
}

$consulta = new Registro();
$metodo = $_POST['metodo'];
$consulta->$metodo();
?>
