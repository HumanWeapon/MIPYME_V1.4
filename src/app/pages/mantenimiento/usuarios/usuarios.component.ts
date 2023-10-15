import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { ErrorService } from 'src/app/services/error.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-usuarios',
  templateUrl:'./usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{


  nuevoUsuario: Usuario = {
    id_usuario: 0,
    creado_por: '',
    fecha_creacion: new Date,
    modificado_por: '',
    fecha_modificacion: new Date,
    usuario: '',
    nombre_usuario: '',
    correo_electronico: '',
    estado_usuario: 0,
    contrasena: '',
    id_rol: 0,
    fecha_ultima_conexion: new Date,
    primer_ingreso: new Date,
    fecha_vencimiento: new Date,
    intentos_fallidos: 0,

  };
 

  dtOptions: DataTables.Settings = {};
  listUsuarios: Usuario[] = [];
  data: any;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  modalEditar: NgbModalRef | undefined;

  constructor(
    private _userService: UsuariosService,
    private toastr: ToastrService,
    private router: Router, 
    private _errorService: ErrorService,
    private modalService: NgbModal 
    ) { }

  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      language: {url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'},
      responsive: true
    };
    this._userService.getAllUsuarios()
      .subscribe((res: any) => {
        this.listUsuarios = res;
        this.dtTrigger.next(null);
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


 
  
  inactivarUsuario(usuario: Usuario, i: any){
    this._userService.inactivarUsuario(usuario).subscribe(data => this.toastr.success('El usuario: '+ usuario.usuario+ ' ha sido activado'));
    this.listUsuarios[i].estado_usuario = 2;
  }
  activarUsuario(usuario: Usuario, i: any){
    this._userService.activarUsuario(usuario).subscribe(data => this.toastr.success('El usuario: '+ usuario.usuario+ ' ha sido activado'));
    this.listUsuarios[i].estado_usuario = 1;
  }


  agregarNuevoUsuario() {
    this._userService.addUsuario(this.nuevoUsuario).subscribe(data => {
      this.toastr.success('Usuario agregado con éxito');
      this.listUsuarios.push(data); // Agregar el nuevo usuario a la lista
      this.nuevoUsuario = {
        id_usuario: 0,
        creado_por: '',
        fecha_creacion: new Date,
        modificado_por: '',
        fecha_modificacion: new Date,
        usuario: '',
        nombre_usuario: '',
        correo_electronico: '',
        estado_usuario: 0,
        contrasena: '',
        id_rol: 0,
        fecha_ultima_conexion: new Date,
        primer_ingreso: new Date,
        fecha_vencimiento: new Date,
        intentos_fallidos: 0,
    
      }; // Limpiar el formulario
    });
  }



  editarUsuario(){

  }
}
