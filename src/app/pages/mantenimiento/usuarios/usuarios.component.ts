import { Component, OnInit } from '@angular/core';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{

  usuario: Usuario = {
    id_usuario: 0,
    creado_por: '',
    fecha_creacion: new Date(),
    modificado_por: '',
    fecha_modificacion: new Date(),
    usuario: '',
    nombre_usuario: '',
    correo_electronico: '',
    estado_usuario: false,
    contrasena: '',
    id_rol: 0,
    fecha_ultima_conexion: new Date(),
    primer_ingreso: new Date(),
    fecha_vencimiento: new Date(),
    intentos_fallidos: 0
  };


  listUsuarios: Usuario[] = [];
  constructor(
    private _userService: UsuariosService) { }

  dtOptions: DataTables.Settings = {};
  
  ngOnInit(): void {
    this.getAllUsers();
    this.dtOptions = {
      searching: true,
      responsive: true,
      language: {url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'},

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
        },
        {
          title: 'Action',
          render: function (data, type, row) {
            return `
              <ng-container>
                <div class="btn-group">
                  <button type="button" class="btn btn-danger" (click)="inactivarUsuario(usuario)"><i class="fas fa-solid fa-user-lock"></i></button>
                  <button type="button" class="btn btn-success" (click)="activarUsuario(usuario)"><i class="fas fa-solid fa-lock-open"></i></button>
                  <button type="button" class="btn btn-warning" (click)="editarUsuario(usuario)"><i class="fas fa-solid fa-pen"></i></button>
                </div>
              </ng-container>
            `;
          }
        }
      ],
    };
  }

  
  inactivarUsuario(usuario: Usuario) {
    // Llama al servicio para inactivar al usuario en la base de datos
    this._userService.inactivarUsuario(usuario).subscribe(() => {
      // Realiza alguna acción después de la inactivación, como recargar la lista de usuarios
      this.getAllUsers();
    });
  }

  activarUsuario(usuario: Usuario) {
    // Llama al servicio para activar al usuario en la base de datos
    this._userService.activarUsuario(usuario).subscribe(() => {
      // Realiza alguna acción después de la activación, como recargar la lista de usuarios
      this.getAllUsers();
    });
  }

  editarUsuario(usuario: Usuario) {
    // Implementa la lógica para editar al usuario, por ejemplo, navegando a una página de edición
    // Puedes usar Angular Router para navegar a una página de edición
  }

  getAllUsers(){
    this._userService.getAllUsuarios().subscribe(data => {
      this.listUsuarios = data;
      console.log(this.listUsuarios)
    })
  }


  agregarNuevoUsuario() {
    this._userService.addUsuario(this.usuario).subscribe((data) => {
      // Realiza alguna ac  ción después de agregar el usuario, como recargar la lista de usuarios
      console.log(data);  
      this.getAllUsers();
      // Cierra el modal
      document.getElementById('agregarUsuario')?.click();
    })
  }
}
