
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { ErrorService } from 'src/app/services/error.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent  implements OnInit{

  usuario: string = '';
  contrasena: string = '';
  loading: boolean = false;
  ultimaConexion: string = '';

/*************************************************************/
  inputDeshabilitadoPassword: boolean = true; // input Deshabilitado/bloqueado Password
  inputDeshabilitado: boolean = true; // input Deshabilitado/bloqueado
  mostrarBoton: boolean = false; //Oculta el Boton de Cancelar
/********************************************************************************************** */
  contrasenaActual: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
<<<<<<< HEAD
  
  usuario: Usuario = {
    id_usuario: 0,
    creado_por: '',
    fecha_creacion: new Date(),
    modificado_por: '',
    fecha_modificacion: new Date(),
    usuario: '',
    nombre_usuario: '',
    correo_electronico: '',
    estado_usuario: 0,
    contrasena: '',
    id_rol: 0,
    rol:'',
    fecha_ultima_conexion: new Date(),
    primer_ingreso: new Date(),
    fecha_vencimiento: new Date(),
    intentos_fallidos: 0
  };
=======
/************************************************************************************************* */

getUser: Usuario = {
  id_usuario: 0,
  creado_por: '',
  fecha_creacion: new Date(),
  modificado_por: '',
  fecha_modificacion: new Date(),
  usuario: '',
  nombre_usuario: '',
  correo_electronico: '',
  estado_usuario: 0,
  contrasena: '',
  id_rol: 0,
  fecha_ultima_conexion: new Date(),
  primer_ingreso: new Date(),
  fecha_vencimiento: new Date(),
  intentos_fallidos: 0
};
>>>>>>> cd0bdd0db3bad5d75ba8e02e506d0697a7852fae

constructor(
  private _userService: UsuariosService,
  private toastr: ToastrService,
  private router: Router, 
  private _errorService: ErrorService) {}

  ngOnInit(): void {

  }

getUsuario(){
  this.getUser = {
   usuario: this.usuario,
   id_usuario: 0,
   creado_por: '',
   fecha_creacion: new Date(),
   modificado_por: '',
   fecha_modificacion: new Date(),
   nombre_usuario: '',
   correo_electronico: '',
   estado_usuario: 0,
   contrasena: '',
   id_rol: 0,
   fecha_ultima_conexion: new Date(),
   primer_ingreso: new Date(),
   fecha_vencimiento: new Date(),
   intentos_fallidos: 0
 }
 this._userService.getUsuario(this.getUser).subscribe(data => {
   this.getUser = data;
   console.log(data)
 });
}


/*************************************************************************************** */

  /*editarUsuario(){
    this._userService.editarUsuario(this.usuarioEditando).subscribe(data => {
      this.toastr.success('Usuario editado con éxito');
      this.listUsuarios[this.indice].usuario = this.usuarioEditando.usuario;
      this.listUsuarios[this.indice].nombre_usuario = this.usuarioEditando.nombre_usuario;
      this.listUsuarios[this.indice].correo_electronico = this.usuarioEditando.correo_electronico;
      this.listUsuarios[this.indice].id_rol = this.usuarioEditando.id_rol;
      this.listUsuarios[this.indice].fecha_vencimiento = this.usuarioEditando.fecha_vencimiento;
    });
  }*/

/*********************************************************************/
//Bloqueo y Desbloqueo de Inputs
 habilitarInput() {
    this.inputDeshabilitado = false;
  }

  habilitarInputPassword() {
    this.inputDeshabilitadoPassword = false;
  }

  deshabilitarInput() {
    this.inputDeshabilitado = true;
  }
//Fin Bloqueo y Desbloqueos de Inputs

//Metodo de Ocultar/Mostrar Boton
cancelarInput(){
  this.mostrarBoton=false;
  this.inputDeshabilitado = true;
}

cancelarInputPassword(){
  this.mostrarBoton=false;
  this.inputDeshabilitado = true;
}

mostrarboton() {
  this.mostrarBoton=true;
}
//Fin Metodo de Ocultar/Mostrar Boton


  cambiarContrasena() {
    if (this.nuevaContrasena !== this.confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }
}

}





