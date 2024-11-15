<?php
    if(isset($_SESSION['usuario'])){
        header("location:inicio");
        exit();
    }
    include 'navegacion.php';
?> 
<link rel="stylesheet" href="<?=CSS.'login.css'?>">

<form id="frm_login" class="container mt-3">
    <div class="row justify-content-center">
        <div class="col-12 col-md-6 fondo">
            <h3>Login</h3>
            <div class="form-floating mb-3">
                <input class="form-control" id="usuario" name="usuario" type="text" placeholder="">
                <label for="usuario"><i class="fa-solid fa-envelope"></i> E-mail</label>
            </div>
            <div class="form-floating mb-3">
                <input id="password" name="password" type="password" class="form-control" placeholder="">
                <label for="password"><i class="fa-solid fa-lock"></i> Password</label>
            </div>
            <button class="btn btn-primary w-100 mb-3" type="button" id="btn_iniciar"><i class="fa-solid fa-door-open me-2"></i> Iniciar sesión</button>
            <a href="registro" class="btn btn-secondary w-100"><i class="fa-solid fa-user-plus me-2"></i> Registro</a>
        </div>
    </div>
</form>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script src="./public/js/login.js"></script>
