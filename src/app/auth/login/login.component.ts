import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario';
import { ErrorService } from 'src/app/services/error.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  loading: boolean = false;



  metodoSeleccionado: string = ''; // Variable para controlar la opción seleccionada

  
  valorEnviar: string = "";

  constructor(
    private _userService: UsuariosService,
    private toastr: ToastrService,
    private router: Router, 
    private _errorService: ErrorService) {}

  ngOnInit(): void {

  }


  //Función que permite navegar al primer formulario del login, ocultando las otras ventanas

  //Muestra el segundo formulario del Login
  navegateToMetodo(){
    this.router.navigate(['/metodo'])
  }
  //Función que valida campos del login
  eliminarEspaciosBlanco() {
    this.usuario = this.usuario.replace(/\s/g, ''); // Elimina espacios en blanco para el cambo usuario
    this.usuario = this.usuario.toUpperCase(); // Convierte el texto a mayúsculas
    this.contrasena = this.contrasena.replace(/\s/g, ''); // Elimina espacios en blanco para el cambo contraseña
  }
  //Función que navega al formulario respuestas de seguridad
  mostrarMetodoRespuestas() {

    if(this.usuario == ""){
      this.toastr.error('Ingresa tu usuario para restablecer la contraseña', 'Error');
    }else if (this.metodoSeleccionado === 'correo') {
      // Realiza la acción correspondiente para la opción "Correo electrónico"
      this.toastr.success('Radio 1 seleccionado. Realizar acción para Correo electrónico.', 'Error');
    } else if (this.metodoSeleccionado === 'preguntas') {
      // Realiza la acción correspondiente para la opción "Preguntas de seguridad"
      this.valorEnviar = this.usuario;
      this.toastr.success('Radio 2 seleccionado. Realizar acción para Preguntas de seguridad.', 'Error');
    } else {
      // Si ninguna opción está seleccionada, muestra un mensaje de error
      this.toastr.error('Ningún método seleccionado. Por favor, elige un método.', 'Error');
    }

  }

  login() {
    // Validamos que el usuario ingrese datos
    if (this.usuario == '' || this.contrasena == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    // Creamos el body
    const usuario: Usuario = {
      usuario: this.usuario,
      contrasena: this.contrasena,
      id_usuario: 0,
      creado_por: '',
      fecha_creacion: new Date(),
      modificado_por: '',
      fecha_modificacion: new Date(),
      nombre_usuario: '',
      correo_electronico: '',
      estado_usuario: false,
      id_rol: 0,
      fecha_ultima_conexion: new Date(),
      primer_ingreso: new Date(),
      fecha_vencimiento: new Date(),
      intentos_fallidos: 0
    }
    
    this.loading = true;

    this._userService.login(usuario).subscribe({
        next: (data) => {
          localStorage.setItem('token', data);
          this.router.navigate(['/dashboard/perfil'])
        },
        error: (e: HttpErrorResponse) => {
          this._errorService.msjError(e);
          this.loading = false
        }
      })
    }
}
