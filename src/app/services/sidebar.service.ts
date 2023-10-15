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
      titulo:'Mantenimiento',
      url: ' ',
      icono: 'nav-icon fas fa-regular fa-building',
      submenu: [
        {titulo:'Usuarios', url: 'usuarios', icono: 'fa fa-users ml-4'},
        {titulo:'Objetos', url: 'objetos', icono: 'fa fa-cubes ml-4'},
        {titulo:'Permisos', url: 'permisos', icono: 'fa fa-user-shield ml-4'},
        {titulo:'Roles', url: 'roles', icono: 'fas fa-solid fa-street-view ml-4'}

      ]
    }
  ]
  constructor() { }
}
