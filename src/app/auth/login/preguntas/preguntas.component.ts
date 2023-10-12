import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Preguntas_Usuario } from 'src/app/interfaces/preguntasUsuario';
import { Usuario } from 'src/app/interfaces/usuario';

import { PreguntasUsuarioService } from 'src/app/services/preguntas-usuario.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  securityForm: FormGroup;
  preguntasRespuestas: any[] = []
  id_usuario: any;
  usuario: Usuario | any = {};

  constructor(
    private fb: FormBuilder,
    private _preguntasUsuario: PreguntasUsuarioService,
    private router: Router,
    private _usuarioService: UsuariosService
    ){
      this.securityForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario() {
    if (this._usuarioService.usuario) {
      this.usuario = this._usuarioService.usuario;
      this.getId_Usuario(this.usuario);
    }else{
      this.router.navigate(['/metodo']);
    }
  }

  getId_Usuario(usuario: Usuario){
    this._usuarioService.getUsuario(usuario).subscribe((data) => {
      this.id_usuario = data;
      this.obtenerPreguntas(this.id_usuario);
    });

    
  }

  obtenerPreguntas(id_usuario: Preguntas_Usuario){
    // Llama al servicio para obtener las preguntas y respuestas desde la API
    console.log(id_usuario.id_usuario);
    this._preguntasUsuario.preguntasRespuestas(id_usuario.id_usuario).subscribe((data) => {
      this.preguntasRespuestas = data;
      this.crearFormulario();
    });
  }

  crearFormulario() {
    const formGroup: { [key: string]: any } = {}; // Declaración explícita del tipo de formGroup
  
    for (const item of this.preguntasRespuestas) {
      formGroup[item.id_pregunta] = [
        '', // Valor inicial del campo de respuesta
        Validators.required, // Validador requerido
      ];
    }
  
    this.securityForm = this.fb.group(formGroup);
  }

  onSubmit() {

    const respuestasUsuario = this.securityForm.value;

    for (const item of respuestasUsuario) {
      console.log(this.securityForm.value)
      this.securityForm.value;
    }

    if (this.securityForm.valid) {
      // Recopila las respuestas del usuario y compáralas con las de la API
      const respuestasUsuario = this.securityForm.value;

      for (const item of this.preguntasRespuestas) {
        const respuestaUsuario = respuestasUsuario[item.id_pregunta];
        const respuestaCorrecta = item.respuesta;

        if (respuestaUsuario !== respuestaCorrecta) {
          // Las respuestas no coinciden, puedes manejar esto como desees
          console.log('Respuesta incorrecta para la pregunta:', item.pregunta);
          return;
        }
      }

      // Todas las respuestas son correctas, puedes continuar con la lógica deseada
      console.log('Todas las respuestas son correctas');
      
    }
    //this.navigateRecuperar();
  }
  navigateRecuperar(){
    this.router.navigate(['/recuperar'])
  }

  
}
