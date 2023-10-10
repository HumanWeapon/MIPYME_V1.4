import { Component, OnInit } from '@angular/core';
import { Permisos } from 'src/app/interfaces/permisos';
import { PermisoService } from 'src/app/services/permisos.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit{

  listPermiso: Permisos[] = [];
  constructor(
    private _permiService: PermisoService ) { }

  dtOptions: DataTables.Settings = {};
  
  ngOnInit(): void {
    this.getAllPermisos();
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this._permiService.getAllPermisos().subscribe((permisos) => {
          // Mapea los datos de usuarios en el formato esperado por DataTables
          const dataTableData = {
            recordsTotal: permisos.length,
            recordsFiltered: permisos.length,
            data: permisos,
          };
          callback(dataTableData);
        });
      },
      columns: [
        {
          title: 'Id Rol',
          data: 'id_rol',
        },
        {
          title: 'Id Objeto',
          data: 'id_objeto',
        },
        {
          title: 'Permiso de Inserción',
          data: 'permiso_insercion',
        },
        {
          title: 'Permiso de Eliminacion',
          data: 'permiso_eliminacion',
        },
        {
          title: 'Permiso de Actualización',
          data: 'permiso_actualizacion',
        },
        {
          title: 'Permiso de Consultar',
          data: 'permiso_consultar',
        },
        {
          title: 'Creado por',
          data: 'creado_por',
        },
        {
          title: 'Fecha creación',
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
                  <button type="button" class="btn btn-danger" (click)="inactivarPermiso(permisos)"><i class="fas fa-solid fa-user-lock"></i></button>
                  <button type="button" class="btn btn-success" (click)="activarPermiso(permisos)"><i class="fas fa-solid fa-lock-open"></i></button>
                  <button type="button" class="btn btn-warning" (click)="editarPermiso(permisos)"><i class="fas fa-solid fa-pen"></i></button>
                </div>
              </ng-container>
            `;
          }
        }
      ],
    };
  }

  inactivarPermiso(permisos: Permisos) {
    // Llama al servicio para inactivar al usuario en la base de datos
    this._permiService.inactivarPermiso(permisos).subscribe(() => {
      // Realiza alguna acción después de la inactivación, como recargar la lista de usuarios
      this.getAllPermisos();
    });
  }

  activarPermiso(permisos: Permisos) {
    // Llama al servicio para activar al usuario en la base de datos
    this._permiService.activarPermiso(permisos).subscribe(() => {
      // Realiza alguna acción después de la activación, como recargar la lista de usuarios
      this.getAllPermisos();
    });
  }

  editarPermiso(permisos: Permisos) {
    // Implementa la lógica para editar al usuario, por ejemplo, navegando a una página de edición
    // Puedes usar Angular Router para navegar a una página de edición
  }

  getAllPermisos(){
    this._permiService.getAllPermisos().subscribe(data => {
      this.listPermiso = data;
      console.log(this.listPermiso)
    })
  }
}
