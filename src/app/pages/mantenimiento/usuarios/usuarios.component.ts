import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from 'src/app/services/roles.service'; // Asegúrate de que la ubicación sea correcta
import { Roles } from 'src/app/interfaces/roles';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
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
    rol: '',
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
    rol: '',
    fecha_ultima_conexion: new Date(),
    primer_ingreso: new Date(),
    fecha_vencimiento: new Date(),
    intentos_fallidos: 0,
  };
  indice: any;

  rol: Roles[] = [];

  dtOptions: DataTables.Settings = {};
  listUsuarios: Usuario[] = [];
  data: any;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  modalEditar: NgbModalRef | undefined;
  RolesService: any;
 


  constructor(
    private _userService: UsuariosService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private rolesService: RolesService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
      responsive: true,
    };
    this._userService.getAllUsuarios().subscribe((res: any) => {
      this.listUsuarios = res;
      this.dtTrigger.next(null);
    });

    this.RolesService.getRol().subscribe((rol: Roles[]) => {
      this.rol = rol;
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
  onInputChange(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.toUpperCase();
  }
  
  
  

  inactivarUsuario(usuario: Usuario, i: any) {
    this._userService.inactivarUsuario(usuario).subscribe(data =>
      this.toastr.success('El usuario: ' + usuario.usuario + ' ha sido inactivado')
    );
    this.listUsuarios[i].estado_usuario = 2;
  }

  activarUsuario(usuario: Usuario, i: any) {
    this._userService.activarUsuario(usuario).subscribe(data =>
      this.toastr.success('El usuario: ' + usuario.usuario + ' ha sido activado')
    );
    this.listUsuarios[i].estado_usuario = 1;
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
<<<<<<< HEAD
      contrasena: 'pyme12345',
=======
      contrasena: this.nuevoUsuario.usuario,
>>>>>>> cd0bdd0db3bad5d75ba8e02e506d0697a7852fae
      id_rol: this.nuevoUsuario.id_rol,
      rol: this.nuevoUsuario.rol,
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
      rol: usuario.rol,
      fecha_ultima_conexion: usuario.fecha_ultima_conexion,
      primer_ingreso: usuario.primer_ingreso,
      fecha_vencimiento: usuario.fecha_vencimiento,
      intentos_fallidos: usuario.intentos_fallidos,
    };
    this.indice = i;
    
  }

  editarUsuario() {
    this._userService.editarUsuario(this.usuarioEditando).subscribe(data => {
      this.toastr.success('Usuario editado con éxito');
      this.listUsuarios[this.indice].usuario = this.usuarioEditando.usuario;
      this.listUsuarios[this.indice].nombre_usuario = this.usuarioEditando.nombre_usuario;
      this.listUsuarios[this.indice].correo_electronico = this.usuarioEditando.correo_electronico;
      this.listUsuarios[this.indice].id_rol = this.usuarioEditando.id_rol;
      this.listUsuarios[this.indice].rol = this.usuarioEditando.rol;
      this.listUsuarios[this.indice].fecha_vencimiento = this.usuarioEditando.fecha_vencimiento;
    });
  }
}
