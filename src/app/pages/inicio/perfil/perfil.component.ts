import { Component, OnInit } from '@angular/core';
import { Preguntas } from 'src/app/interfaces/preguntas';
import { Preguntas_Usuario } from 'src/app/interfaces/preguntasUsuario';
import { Usuario } from 'src/app/interfaces/usuario';
import { PreguntasUsuarioService } from 'src/app/services/preguntas-usuario.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent  implements OnInit{

  contrasenaActual: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
/*************************************************************/
  inputDeshabilitadoPassword: boolean = true; // input Deshabilitado/bloqueado Password
  inputDeshabilitado: boolean = true; // input Deshabilitado/bloqueado
  botonDeshabilitado: boolean = true;
  mostrarBoton: boolean = false; //Oculta el Boton de Cancelar
/********************************************************************************************** */
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
    fecha_ultima_conexion: new Date(),
    primer_ingreso: new Date(),
    fecha_vencimiento: new Date(),
    intentos_fallidos: 0
  };
  preguntas: Preguntas_Usuario[] = [];
  listPreguntas: any[] = [];

  constructor(
    private _preguntasUsuarioService: PreguntasUsuarioService,
    private _userService: UsuariosService,
    private toastr: ToastrService,
    ){}

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(){
    const userLocal = localStorage.getItem('usuario');
    if(userLocal == null){

    }else{
      this.usuario.usuario = userLocal;
      this._userService.getUsuario(this.usuario).subscribe(data => {
        this.usuario = data;
      });
    }
  }

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

habilitarBoton() {
  this.botonDeshabilitado = false;
}

mostrarboton() {
this.mostrarBoton=true;
this.botonDeshabilitado = false;
}
//Fin Metodo de Ocultar/Mostrar Boton

editarUsuario() {
  this._userService.editarUsuario(this.usuario).subscribe(data => {
    this.toastr.success('Usuario editado con éxito');
    this.usuario.nombre_usuario = this.usuario.nombre_usuario;
    this.usuario.correo_electronico = this.usuario.correo_electronico;
  });
this.mostrarBoton=false;
this.botonDeshabilitado = true;
this.inputDeshabilitado = true;
}

cambiarContrasena() {
  if (this.nuevaContrasena !== this.confirmarContrasena) {
    alert('Las contraseñas no coinciden');
    return;
  }



  
}



}

