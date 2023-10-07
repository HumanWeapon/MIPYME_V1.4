import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu:any[]=[
    {
      titulo:'Dashboard',
      url: ' ',
      icono: 'nav-icon fas fa-solid fa-user',
      submenu: []
    },

    {
      titulo:'Usuarios',
      url: 'usuarios',
      icono: 'nav-icon fas fa-solid fa-user',
      submenu: []
    },


    {
      titulo:'Mantenimiento',
      url: ' ',
      icono: 'nav-icon fas fa-regular fa-building',
      submenu: [
        {titulo:'Usuarios', url: 'usuarios', icono: 'fa fa-users ml-1'},
        {titulo:'Objetos', url: 'objetos', icono: 'fa fa-cubes ml-1'},
        {titulo:'Permisos', url: 'permisos', icono: 'fa fa-cubes ml-1'},
        {titulo:'Roles', url: 'roles', icono: 'fa fa-cubes ml-1'}
      ]
    }
  ]
  constructor() { }
}
