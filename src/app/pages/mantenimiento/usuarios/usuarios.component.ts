import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ErrorService } from 'src/app/services/error.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from 'src/app/services/roles.service'; // Asegúrate de que la ubicación sea correcta
import { Roles } from 'src/app/interfaces/roles';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit  {

  usuarioEditando: Usuario = {
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
    intentos_fallidos: 0,
  };

  nuevoUsuario: Usuario = {
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
    intentos_fallidos: 0,
  };
  indice: any;

  dtOptions: DataTables.Settings = {};
  listUsuarios: Usuario[] = [];
  data: any; 

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  modalEditar: NgbModalRef | undefined;

  rol: Roles[] = [];
  usuariosAllRoles: any[] = []


  constructor(
    private _userService: UsuariosService,
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService,
    private modalService: NgbModal,
    private _rolesService: RolesService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      language: {url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'},
      responsive: true,
      search: true
    };

    this._userService.usuariosAllRoles().subscribe({
      next: (data) =>{
        this.usuariosAllRoles = data;
        this.listUsuarios = data;
        this.dtTrigger.next(null);
      }

    });


    this._rolesService.getAllRoles().subscribe((data) => {
      this.rol = data;
      console.log(this.rol)
    });

    this._userService.usuariosAllRoles().subscribe({
      next: (data) =>{
        this.usuariosAllRoles = data;
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onInputChange(event: any, field: string) {
    const inputValue = event.target.value;
    if (field === 'correo_electronico' || field === 'usuario') {
      // Convierte a mayúsculas y elimina espacios en blanco
      event.target.value = inputValue.toUpperCase().replace(/\s/g, '')
    } else if (field === 'nombre_usuario') {
      // Convierte a mayúsculas sin eliminar espacios en blanco
      event.target.value = inputValue.toUpperCase();
    }
  }
  
 inactivarUsuario(usuario: any, i: any) {
    this._userService.inactivarUsuario(usuario).subscribe(data =>
      this.toastr.success('El usuario: ' + usuario.usuario + ' ha sido inactivado')
    );
    this.usuariosAllRoles[i].estado_usuario = 2;
  }
  activarUsuario(usuario: any, i: any) {
    this._userService.activarUsuario(usuario).subscribe(data =>
      this.toastr.success('El usuario: ' + usuario.usuario + ' ha sido activado')
    );
    this.usuariosAllRoles[i].estado_usuario = 1;
  }

  agregarNuevoUsuario() {
    this.nuevoUsuario = {
      id_usuario: 0,
      creado_por: 'SYSTEM',
      fecha_creacion: new Date(),
      modificado_por: 'SYSTEM',
      fecha_modificacion: new Date(),
      usuario: this.nuevoUsuario.usuario,
      nombre_usuario: this.nuevoUsuario.nombre_usuario,
      correo_electronico: this.nuevoUsuario.correo_electronico,
      estado_usuario: 1,
      contrasena: this.nuevoUsuario.usuario,
      id_rol: this.nuevoUsuario.id_rol,
      fecha_ultima_conexion: new Date(),
      primer_ingreso: new Date(),
      fecha_vencimiento: this.nuevoUsuario.fecha_vencimiento,
      intentos_fallidos: 0,
    };

    this._userService.addUsuario(this.nuevoUsuario).subscribe(data => {
      this.toastr.success('Usuario agregado con éxito');
    });
  }

  

  obtenerIdUsuario(usuario: Usuario, i: any) {
    this.usuarioEditando = {
      id_usuario: usuario.id_usuario,
      creado_por: usuario.creado_por,
      fecha_creacion: usuario.fecha_creacion,
      modificado_por: usuario.modificado_por,
      fecha_modificacion: usuario.fecha_modificacion,
      usuario: usuario.usuario,
      nombre_usuario: usuario.nombre_usuario,
      correo_electronico: usuario.correo_electronico,
      estado_usuario: usuario.estado_usuario,
      contrasena: usuario.contrasena,
      id_rol: usuario.id_rol,
      fecha_ultima_conexion: usuario.fecha_ultima_conexion,
      primer_ingreso: usuario.primer_ingreso,
      fecha_vencimiento: usuario.fecha_vencimiento,
      intentos_fallidos: usuario.intentos_fallidos,
    };
    this.indice = i;
    
  }
  
  editarUsuario(rol: any) {
    this._userService.editarUsuario(this.usuarioEditando).subscribe(data => {
      this.toastr.success('Usuario editado con éxito');
      if(this.usuariosAllRoles == null){
        //no se puede editar el usuario
      }else{
      this.usuariosAllRoles[this.indice].usuario = this.usuarioEditando.usuario;
      this.usuariosAllRoles[this.indice].nombre_usuario = this.usuarioEditando.nombre_usuario;
      this.usuariosAllRoles[this.indice].correo_electronico = this.usuarioEditando.correo_electronico;
      this.usuariosAllRoles[this.indice].roles.rol = rol.rol;
      this.usuariosAllRoles[this.indice].fecha_vencimiento = this.usuarioEditando.fecha_vencimiento; 
      }

    });
  }
}
