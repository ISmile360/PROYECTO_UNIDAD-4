<?php

require_once '../config/conexion.php';
session_start();

class Login extends Conexion{
    private function crear_sesion($datos){
        $_SESSION['usuario'] = $datos;            
    }
    public function cerrar_sesion(){
        session_unset();
        session_destroy();
        echo json_encode([1,"Sesion finalizada!"]);
    }
    public function iniciar_sesion(){
        $usuario = $_POST['usuario'];
        $password = $_POST['password'];
    
        // Validación de formato de email
        if (!filter_var($usuario, FILTER_VALIDATE_EMAIL)) {
            echo json_encode([0, "El email proporcionado no es válido."]);
            return;
        }
    
        $consulta = $this->obtener_conexion()->prepare("SELECT * FROM t_usuario WHERE usuario = :usuario");
        $consulta->bindParam(":usuario",$usuario);
        $consulta->execute();
        $datos = $consulta->fetch(PDO::FETCH_ASSOC);
        if($datos){
            if(password_verify($password, $datos['password'])){
                $this->crear_sesion($datos);
                echo json_encode([1, "Sesión iniciada!"]);
            }else{
                echo json_encode([0, "Error en credenciales de acceso!"]);
            }
        }else{
            echo json_encode([0, "Error al buscar información!"]);
        }
    }
}

$consulta = new Login();
$metodo = $_POST['metodo'];
$consulta->$metodo();

?>


