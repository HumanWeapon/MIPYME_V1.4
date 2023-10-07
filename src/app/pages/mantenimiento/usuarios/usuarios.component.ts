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

  constructor(private _userService: UsuariosService){}

  
  ngOnInit(): void {
    this.getAllUsers();
  }


  getAllUsers(){
    this._userService.getAllUsuarios().subscribe(data => {
      this.listUsuarios = data;
      console.log(this.listUsuarios)
    })
  }
}
