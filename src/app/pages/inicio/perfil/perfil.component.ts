import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent  implements OnInit{
oldpassword:string='';
newpassword:string='';
confirmpassword:string='';

  inputDeshabilitado: boolean = true; // input Deshabilitado/bloqueado
     
  constructor( private toastr: ToastrService) {


  }
   
  ngOnInit(): void {
  }
  
  habilitarInput() {
    this.inputDeshabilitado = false;
  }

  deshabilitarInput() {
    this.inputDeshabilitado = true;
  }

  passwordChanged() {
    if (this.oldpassword == '' || this.newpassword == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return 
    }
}




}


