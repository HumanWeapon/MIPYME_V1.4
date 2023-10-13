import { Component, OnInit } from '@angular/core';
import { Objetos } from 'src/app/interfaces/objetos';
import { ObjetService } from 'src/app/services/objetos.service';

@Component({
  selector: 'app-objetos',
  templateUrl: './objetos.component.html',
  styleUrls: ['./objetos.component.css']
})
export class ObjetosComponent implements OnInit{

  listObjet: Objetos[] = [];
  constructor(
    private _objetService: ObjetService ) { }

  dtOptions: DataTables.Settings = {};
  
  ngOnInit(): void {
    this.getAllObjetos();
    this.dtOptions = {
      searching: true,
      responsive: true,
      language: {url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'},
      ajax: (dataTablesParameters: any, callback) => {
        this._objetService.getAllObjetos().subscribe((objetos) => {
          // Mapea los datos de los objetos en el formato esperado por DataTables
          const dataTableData = {
            recordsTotal: objetos.length,
            recordsFiltered: objetos.length,
            data: objetos,
          };
          callback(dataTableData);
        });
      },
      columns: [
        {
          title: 'Objeto',
          data: 'objeto',
        },
        {
          title: 'Descripción',
          data: 'descripcion',
        },
        {
          title: 'Tipo Objeto',
          data: 'tipo_objeto',
        },
        {
          title: 'Creado Por',
          data: 'creado_por',
        },
        {
          title: 'Fecha Creación',
          data: 'fecha_creacion',
        },
        {
          title: 'Modificado Por',
          data: 'modificado_por',
        },  
        {
          title: 'Fecha Modificación',
          data: 'fecha_modificacion',
        },     
        {
          title: 'Action',
          render: function (data, type, row) {
            return `
              <ng-container>
                <div class="btn-group">
                  <button type="button" class="btn btn-danger" (click)="inactivarObjeto(objetos)"><i class="fas fa-solid fa-user-lock"></i></button>
                  <button type="button" class="btn btn-success" (click)="activarObjeto(objetos)"><i class="fas fa-solid fa-lock-open"></i></button>
                  <button type="button" class="btn btn-warning" (click)="editarObjeto(objetos)"><i class="fas fa-solid fa-pen"></i></button>
                </div>
              </ng-container>
            `;
          }
        }
      ],
    };
  }

  inactivarObjeto(objetos: Objetos) {
    // Llama al servicio para inactivar al usuario en la base de datos
    this._objetService.inactivarObjeto(objetos).subscribe(() => {
      // Realiza alguna acción después de la inactivación, como recargar la lista de usuarios
      this.getAllObjetos();
    });
  }

  activarObjeto(objetos: Objetos) {
    // Llama al servicio para activar al usuario en la base de datos
    this._objetService.activarObjeto(objetos).subscribe(() => {
      // Realiza alguna acción después de la activación, como recargar la lista de usuarios
      this.getAllObjetos();
    });
  }

  editarObjeto(objetos: Objetos) {
    // Implementa la lógica para editar al usuario, por ejemplo, navegando a una página de edición
    // Puedes usar Angular Router para navegar a una página de edición
  }
  getAllObjetos(){
    this._objetService.getAllObjetos().subscribe(data => {
      this.listObjet = data;
      console.log(this.listObjet)
    })
  }
}







