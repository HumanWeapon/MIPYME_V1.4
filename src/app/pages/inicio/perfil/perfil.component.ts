import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent  implements OnInit{
    
  constructor (private _userService: UsuariosService,) {

  }
   
  ngOnInit(): void {
    this._userService.getAllUsuarios().subscribe(data =>{
      console.log(data)
    })
  }


  }

