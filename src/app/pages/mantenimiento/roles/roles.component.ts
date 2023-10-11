import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/interfaces/roles';
import { RolService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit{

  listRol: Roles[] = [];
  constructor(
    private _rolService: RolService  ) { }

  dtOptions: DataTables.Settings = {};
  
  ngOnInit(): void {
    this.getAllRoles();
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this._rolService.getAllRoles().subscribe((roles) => {
          // Mapea los datos de usuarios en el formato esperado por DataTables
          const dataTableData = {
            recordsTotal: roles.length,
            recordsFiltered: roles.length,
            data: roles,
          };
          callback(dataTableData);
        });
      },
      columns: [
        {
          title: 'Rol',
          data: 'rol',
        },
        {
          title: 'Descripción',
          data: 'descripcion',
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
          title: 'Fecha modificacion',
          data: 'fecha_modificacion',
        },
        {
          title: 'Action',
          render: function (data, type, row) {
            return `
              <ng-container>
                <div class="btn-group">
                  <button type="button" class="btn btn-danger" (click)="inactivarRol(roles)"><i class="fas fa-solid fa-user-lock"></i></button>
                  <button type="button" class="btn btn-success" (click)="activarRol(roles)"><i class="fas fa-solid fa-lock-open"></i></button>
                  <button type="button" class="btn btn-warning" (click)="editarRol(roles)"><i class="fas fa-solid fa-pen"></i></button>
                </div>
              </ng-container>
            `;
          }
        }
      ],
    };
  }

  inactivarRol(roles: Roles) {
    // Llama al servicio para inactivar al usuario en la base de datos
    this._rolService.inactivarRol(roles).subscribe(() => {
      // Realiza alguna acción después de la inactivación, como recargar la lista de usuarios
      this.getAllRoles();
    });
  }

  activarRol(roles: Roles) {
    // Llama al servicio para activar al rol en la base de datos
    this._rolService.activarRol(roles).subscribe(() => {
      // Realiza alguna acción después de la activación, como recargar la lista de usuarios
      this.getAllRoles();
    });
  }

  editarRol(roles: Roles) {
    // Implementa la lógica para editar al usuario, por ejemplo, navegando a una página de edición
    // Puedes usar Angular Router para navegar a una página de edición
  }

  getAllRoles(){
    this._rolService.getAllRoles().subscribe(data => {
      this.listRol = data;
      console.log(this.listRol)
    })
  }
}
