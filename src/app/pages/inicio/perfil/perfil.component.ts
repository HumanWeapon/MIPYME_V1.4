import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent  implements OnInit{
  
    
  constructor (private _userService: UsuariosService) {}

    datosUsuario!:Usuario;
     editarform = new FormGroup({
         usuario: new FormControl(''),
         nombre: new FormControl(''),
         email: new FormControl(''),
     });
     

   
  ngOnInit(): void {

 /*this.getUsuario();*/

 this._userService.getAllUsuarios().subscribe(data => {
  this.datosUsuario = data [8];
  this.editarform.setValue({
   'usuario': this.datosUsuario.usuario,
   'nombre': this.datosUsuario.nombre_usuario,
   'email': this.datosUsuario.correo_electronico,
 });

 console.log(this.editarform.value);
});

  }

    /*getUsuario(){
      const user: Usuario = {
        usuario: this.usuarioLogin,
        contrasena: '',
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

      this._userService.getUsuario(user).subscribe(data => {
        this.usuario = data;
       this.editarform.setValue({
         'usuario': this.datosUsuario.usuario,
         'nombre': this.datosUsuario.nombre_usuario,
         'email': this.datosUsuario.correo_electronico,
       });
       console.log(this.editarform.value);
      });
 
    }*/

  }
  


