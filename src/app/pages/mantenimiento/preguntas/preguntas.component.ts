import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Preguntas } from 'src/app/interfaces/preguntas';
import { ErrorService } from 'src/app/services/error.service';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-preguntas',
  templateUrl:'./preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit{

  preguntaEditando: Preguntas = {
    id_pregunta: 0,
    pregunta: '',
    creado_por: '',
    fecha_creacion: new Date() ,
    modificado_por: '' ,
    fecha_modificacion: new Date() 

  };

  nuevoPregunta: Preguntas = {
    id_pregunta: 0,
    pregunta: '',
    creado_por: '',
    fecha_creacion: new Date() ,
    modificado_por: '' ,
    fecha_modificacion: new Date() 

  };
  indice: any;

  dtOptions: DataTables.Settings = {};
  listPreguntas: Preguntas[] = [];
  data: any;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  modalEditar: NgbModalRef | undefined;

  constructor(
    private _questionService: PreguntasService,
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
    this._questionService.getAllPreguntas()
      .subscribe((res: any) => {
        this.listPreguntas = res;
        this.dtTrigger.next(null);
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


 

  agregarNuevoPregunta() {

    this.nuevoPregunta = {
      id_pregunta: 0,
      pregunta: this.nuevoPregunta.pregunta,
      creado_por: 'SYSTEM',
      fecha_creacion: new Date() ,
      modificado_por: 'SYSTEM' ,
      fecha_modificacion: new Date() 

    };

    this._questionService.addPregunta(this.nuevoPregunta).subscribe(data => {
      this.toastr.success('Pregunta agregado con éxito');
    });
  }


  obtenerIdPregunta(preguntas: Preguntas, i: any){
    this.preguntaEditando = {  
      id_pregunta: preguntas.id_pregunta,
      pregunta: preguntas.pregunta,
      creado_por: preguntas.creado_por,
      fecha_creacion: preguntas.fecha_creacion ,
      modificado_por: preguntas.modificado_por,
      fecha_modificacion: preguntas.fecha_modificacion 

    };
    this.indice = i;
  }


  editarPregunta(){
    this._questionService.editarPregunta(this.preguntaEditando).subscribe(data => {
      this.toastr.success('Pregunta editada con éxito');
      this.listPreguntas[this.indice].pregunta = this.preguntaEditando.pregunta;
      
    });
  }
}
