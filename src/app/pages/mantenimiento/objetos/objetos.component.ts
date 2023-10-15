import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Objetos } from 'src/app/interfaces/objetos';
import { ErrorService } from 'src/app/services/error.service';
import { ObjetService } from 'src/app/services/objetos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-objetos',
  templateUrl:'./objetos.component.html',
  styleUrls: ['./objetos.component.css']
})
export class ObjetosComponent implements OnInit{


  nuevoObjeto: Objetos = {
    id_objeto: 0,
    objeto: '',
    descripcion: '',
    tipo_objeto: '',
    estado_objeto: 0,
    creado_por: '',
    fecha_creacion: new Date,
    modificado_por: '',
    fecha_modificacion: new Date,

  };
 

  dtOptions: DataTables.Settings = {};
  listObjetos: Objetos[] = [];
  data: any;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  modalEditar: NgbModalRef | undefined;

  constructor(
    private _objService: ObjetService,
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
    this._objService.getAllObjetos()
      .subscribe((res: any) => {
        this.listObjetos = res;
        this.dtTrigger.next(null);
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


 
  
  inactivarObjeto(objeto: Objetos, i: any){
    this._objService.inactivarObjeto(objeto).subscribe(data => this.toastr.success('El objeto: '+ objeto.objeto+ ' ha sido activado'));
    this.listObjetos[i].estado_objeto = 2;
  }
  activarObjeto(objeto: Objetos, i: any){
    this._objService.activarObjeto(objeto).subscribe(data => this.toastr.success('El objeto: '+ objeto.objeto+ ' ha sido activado'));
    this.listObjetos[i].estado_objeto = 1;
  }


  agregarNuevoObjeto() {
    this._objService.addObjeto(this.nuevoObjeto).subscribe(data => {
      this.toastr.success('Objeto agregado con éxito');
      this.listObjetos.push(data); // Agregar el nuevo usuario a la lista
      this.nuevoObjeto = {
        id_objeto: 0,
        objeto: '',
        descripcion: '',
        tipo_objeto: '',
        estado_objeto: 0,
        creado_por: '',
        fecha_creacion: new Date,
        modificado_por: '',
        fecha_modificacion: new Date,
    
      }; 
    });
  }



  editarrObjeto(){

  }
}
