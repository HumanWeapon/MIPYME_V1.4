import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Preguntas } from 'src/app/interfaces/preguntas';
import { Preguntas_Usuario } from 'src/app/interfaces/preguntasUsuario';
import { Usuario } from 'src/app/interfaces/usuario';
import { ErrorService } from 'src/app/services/error.service';
import { PreguntasUsuarioService } from 'src/app/services/preguntas-usuario.service';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-form-preguntas',
  templateUrl: './form-preguntas.component.html',
  styleUrls: ['./form-preguntas.component.css']
})
export class FormPreguntasComponent implements OnInit{
  loading: boolean = false;
  listPreguntasUsuario: Preguntas_Usuario[] = [];
  listPreguntas: Preguntas[] = [];
  preguntasFiltradas: Preguntas[] = [];
  pregunta: Preguntas[] = [];
  respuesta: string[] = ['', '', ''];
  @Input() usuarioLogin: string = ''; 
  selectedValue: any;
  usuario: Usuario |any;
  respuestaValid: boolean = false;

  constructor(
    private _preguntasService: PreguntasService,
    private _userService: UsuariosService,
    private toastr: ToastrService,
    private router: Router, 
    private _errorService: ErrorService,
    private _preguntasUsuarioService: PreguntasUsuarioService
  ){
    
  }

  ngOnInit(): void {
    this.getUsuario();
  }

  conbinarPreguntas(){
    for(const item1 of this.listPreguntas){
      for(const item2 of this.listPreguntasUsuario){
        if(item1.id_pregunta === item2.id_pregunta){
          this.preguntasFiltradas.push(item1)
        }
      }
    }
  /*console.log(this.preguntasFiltradas);*/
  }

  getUsuario(){
    const user: Usuario = {
      usuario: this.usuarioLogin,
      contrasena: '',
      id_usuario: 0,
      creado_por: '',
      fecha_creacion: new Date(),
      modificado_por: '',
      fecha_modificacion: new Date(),
      nombre_usuario: '',
      correo_electronico: '',
      estado_usuario: false,
      id_rol: 0,
      fecha_ultima_conexion: new Date(),
      preguntas_contestadas: 0,
      primer_ingreso: new Date(),
      fecha_vencimiento: new Date()
    }
    this._userService.getUsuario(user).subscribe(data =>{
      this.usuario = data; 
      this.getPreguntasUsuario(); // Llama a getPreguntasUsuario después de que usuario se inicialice
      this.getPreguntas(); // Llama a getPreguntas después de que usuario se inicialice
    })
  }

  getPreguntas() {
    this._preguntasService.getPreguntas().subscribe(data => {
      this.listPreguntas = data; // Accede a la propiedad _pregunta del objeto de respuesta
      this.conbinarPreguntas();
    });
  }

  getPreguntasUsuario() {
    const preguntasUsuario: Preguntas_Usuario = {
      id_preguntas_usuario: 0,
      id_pregunta: 0,
      id_usuario: this.usuario.id_usuario,
      respuesta: '',
      creado_por: '',
      fecha_creacion: new Date(),
      modificado_por: '' ,
      fecha_modificacion: new Date()
    }

    this._preguntasUsuarioService.getPreguntasUsuario(preguntasUsuario).subscribe(data => {
      this.listPreguntasUsuario = (data); // Accede a la propiedad _pregunta del objeto de respuesta

    }, error => {
      // Manejar cualquier error aquí, si es necesario
      console.error('Error al obtener preguntas de usuario:', error);
    });
  }



  navigateLogin() {
    this.router.navigate(['/login']);
   }

  submitForm() {

    this.respuesta[0] = this.respuesta[0];
    this.respuesta[1] = this.respuesta[1];
    this.respuesta[2] = this.respuesta[2];

    this.pregunta[0] = this.pregunta[0];
    this.pregunta[1] = this.pregunta[1];
    this.pregunta[2] = this.pregunta[2];

    if(this.pregunta[0] == this.pregunta[1] || this.pregunta[0] == this.pregunta[2]){
      this.toastr.error('Las preguntas no de seben repetir', 'Error');
    }
    if(this.pregunta[1] == this.pregunta[0] || this.pregunta[1] == this.pregunta[2]){
      this.toastr.error('Las preguntas no de seben repetir', 'Error');
    }
    if(this.pregunta[2] == this.pregunta[0] || this.pregunta[2] == this.pregunta[1]){
      this.toastr.error('Las preguntas no de seben repetir', 'Error');
    }
    if(this.respuesta[0] == "" || this.respuesta[1] == "" || this.respuesta[2] == ""){
      this.toastr.error('Todos los campos son obligatorios', 'Error');
    }
    else{
      for(const item of this.listPreguntasUsuario){
<<<<<<< HEAD
        console.log(item);
        if(item.respuesta !== this.respuesta[0] || item.respuesta !== this.respuesta[1] || item.respuesta !== this.respuesta[2]){
          this.toastr.error('No se ha podido restablecer la contraseña, intenta otro método', 'Error');
        }else{
          this.toastr.success('Respuestas guardadas', 'Error');
=======
        const respuesta: Preguntas_Usuario = {
          id_preguntas_usuario: item.id_preguntas_usuario,
          id_pregunta: 0,
          id_usuario: 0,
          respuesta: 'REYNALDO',
          creado_por: '',
          fecha_creacion: new Date(),
          modificado_por: '',
          fecha_modificacion: new Date()
>>>>>>> aa9ac75799f23d0278498d74bedc020a0cc51194
        }
        this._preguntasUsuarioService.validarRespuesta(respuesta).subscribe(data =>{
          if (data){
            this.respuestaValid = true
            console.log(this.respuestaValid);
          }else{}
            this.respuestaValid = false
            console.log(this.respuestaValid);
        })

      }
    }

  }
  validarRespuesta(){


    
  }



  selectedPregunta(e: any){

    this.pregunta[0] = this.pregunta[0];
    this.pregunta[1] = this.pregunta[1];
    this.pregunta[2] = this.pregunta[2];

    this.selectedValue = e.target.value;
<<<<<<< HEAD

=======
>>>>>>> aa9ac75799f23d0278498d74bedc020a0cc51194
  }
}