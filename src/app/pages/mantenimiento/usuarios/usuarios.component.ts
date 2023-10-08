import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{

  listUsuarios: Usuario[] = [];
  constructor(private _userService: UsuariosService) { }

  dtOptions: DataTables.Settings = {};
  
  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this._userService.getAllUsuarios().subscribe((usuarios) => {
          // Mapea los datos de usuarios en el formato esperado por DataTables
          const dataTableData = {
            recordsTotal: usuarios.length,
            recordsFiltered: usuarios.length,
            data: usuarios,
          };
          callback(dataTableData);
        });
      },
      columns: [
        {
          title: 'Usuario',
          data: 'usuario',
        },
        {
          title: 'Nombre',
          data: 'nombre_usuario',
        },
        {
          title: 'Correo',
          data: 'correo_electronico',
        },
        {
          title: 'Estado',
          data: 'estado_usuario',
        },
        {
          title: 'Id Rol',
          data: 'id_rol',
        },
        {
          title: 'Última conexión',
          data: 'fecha_ultima_conexion',
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
          title: 'Vencimiento',
          data: 'fecha_vencimiento',
        }
      ],
    };
  }

  getAllUsers() {
    this._userService.getAllUsuarios().subscribe(data => {
      this.listUsuarios = data;
      console.log(this.listUsuarios);
    });
  }
}
