import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Pyme  } from 'src/app/interfaces/empresas/pyme';
import { PymesService } from 'src/app/services/negocio/pymes.service';
import { ErrorService } from 'src/app/services/error.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-pymes',
  templateUrl: './pymes.component.html',
  styleUrls: ['./pymes.component.css']
})

export class PymesComponent implements OnInit  {

  pymeEditando: Pyme = {
    id_pyme: 0,
    nombre_pyme: '',
    categoria: '',
    descripcion: '',
    creado_por: '',
    fecha_creacion: new Date(),
    modificado_por: '',
    fecha_modificacion: new Date(),
    estado: 0
  };

  nuevaPyme: Pyme = {
    id_pyme: 0,
    nombre_pyme: '',
    categoria: '',
    descripcion: '',
    creado_por: '',
    fecha_creacion: new Date(),
    modificado_por: '',
    fecha_modificacion: new Date(),
    estado: 0
  };
  indice: any;

  dtOptions: DataTables.Settings = {};
  listPymes: Pyme[] = [];
  data: any; 

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  modalEditar: NgbModalRef | undefined;

  pymesAll: any[] = []

  constructor(
    private _pymeService: PymesService,
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService,
    private modalService: NgbModal,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.getAllPyme();
  }

  getAllPyme(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
      responsive: true,
    };

    this._pymeService.getAllPymes().subscribe({
      next: (data) =>{
        this.pymesAll=data;
        this.listPymes = data;
        this.dtTrigger.next(null);
      }

    });


  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  
 inactivarPyme(pyme: any, i: any) {
    this._pymeService.inactivarPyme(pyme).subscribe(data =>
      this.toastr.success('La Pyme: ' + pyme.pyme + ' ha sido inactivada')
    );
    this.pymesAll[i].estado = 2;
  }
  activarPyme(pyme: any, i: any) {
    this._pymeService.activarPyme(pyme).subscribe(data =>
      this.toastr.success('La Pyme: ' + pyme.pyme + ' ha sido activada')
    );
    this.pymesAll[i].estado = 1;
  }

  agregarNuevaPyme() {
    this.nuevaPyme={
      id_pyme: 0,
      nombre_pyme: this.nuevaPyme.nombre_pyme,
      categoria: this.nuevaPyme.categoria,
      descripcion: this.nuevaPyme.descripcion,
      creado_por: 'SYSTEM',
      fecha_creacion: new Date(),
      modificado_por: 'SYSTEM',
      fecha_modificacion: new Date(),
      estado: 1
    };

    this._pymeService.postPyme(this.nuevaPyme).subscribe(data => {
      this.toastr.success('Pyme agregada con éxito');


        // Recargar la página
        location.reload();
        // Actualizar la vista
        this.ngZone.run(() => {        
        });
    });
  }

  onInputChange(event: any, field: string) {
    if (field === 'nombre_pyme' || field === 'descripcion') {
      const inputValue = event.target.value;
      const uppercaseValue = inputValue.toUpperCase();
      event.target.value = uppercaseValue;
    }
  }

  obtenerIdPyme(pyme: Pyme, i: any) {
    this.pymeEditando = {
      id_pyme: pyme.id_pyme,
      nombre_pyme: pyme.nombre_pyme,
      categoria: pyme.categoria,
      descripcion:pyme.descripcion,
      creado_por: pyme.creado_por,
      fecha_creacion: pyme.fecha_creacion,
      modificado_por: pyme.modificado_por,
      fecha_modificacion: pyme.fecha_modificacion,
      estado: pyme.estado
    };
    this.indice = i;
    
  }
  
 /* editarUsuario(rol: any) {
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

        // Recargar la página
        location.reload();
        // Actualizar la vista
        this.ngZone.run(() => {        
        });

    });
  }*/
}
