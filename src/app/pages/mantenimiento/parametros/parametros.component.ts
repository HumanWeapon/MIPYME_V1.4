import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Parametros } from 'src/app/interfaces/parametros';
import { ErrorService } from 'src/app/services/error.service';
import { ParametrosService } from 'src/app/services/parametro.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-parametros',
  templateUrl:'./parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit{

  parametroEditando: Parametros = {
    id_parametro: 0,
    parametro: '',
    valor: 0,
    id_usuario: 0,
    creado_por: '',
    fecha_creacion: new Date(),
    modificado_por: '',
    fecha_modificacion: new Date(),
    alerta_busqueda: 0, 
  };

  nuevoParametro: Parametros = {
    id_parametro: 0,
    parametro: '',
    valor: 0,
    id_usuario: 0,
    creado_por: '',
    fecha_creacion: new Date(),
    modificado_por: '',
    fecha_modificacion: new Date(),
    alerta_busqueda: 0, 
    
  };
  indice: any;

  dtOptions: DataTables.Settings = {};
  listParametros: Parametros[] = [];
  data: any;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  modalEditar: NgbModalRef | undefined;

  constructor(
    private _parametroService: ParametrosService,
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
    this._parametroService.getAllParametros()
      .subscribe((res: any) => {
        this.listParametros = res;
        this.dtTrigger.next(null);
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  onInputChange(event: any, field: string) {
    const inputValue = event.target.value;
    if (field === 'parametro') {
      // Convierte a mayúsculas y elimina espacios en blanco
      event.target.value = inputValue.toUpperCase().replace(/\s/g, '')
    }
  }


  agregarNuevoParametro() {

    this.nuevoParametro = {
      id_parametro: 0,
      parametro: this.nuevoParametro.parametro,
      valor: this.nuevoParametro.valor,
      id_usuario: 0,
      creado_por: '',
      fecha_creacion: new Date(),
      modificado_por: '',
      fecha_modificacion: new Date(),
      alerta_busqueda: 0, 
    };

    this._parametroService.addParametro(this.nuevoParametro).subscribe(data => {
      this.toastr.success('Parametro agregado con éxito');
    });
  }


  obtenerIdParametro(parametro: Parametros, i: any){
    this.parametroEditando = {
      id_parametro: parametro.id_parametro,
      parametro: parametro.parametro,
      valor: parametro.valor,
      id_usuario: parametro.id_usuario,
      creado_por: parametro.creado_por,
      fecha_creacion: parametro.fecha_creacion,
      modificado_por: parametro.modificado_por,
      fecha_modificacion: parametro.fecha_modificacion,
      alerta_busqueda: parametro.alerta_busqueda, 
    };
    this.indice = i;
  }


  editarParametro(){
    this._parametroService.editarParametro(this.parametroEditando).subscribe(data => {
      this.toastr.success('Parametro editado con éxito');
      this.listParametros[this.indice].parametro = this.parametroEditando.parametro;
      this.listParametros[this.indice].valor = this.parametroEditando.valor;
      
    });
  }
}
