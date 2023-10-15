import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { LoginPymeComponent } from './login-pyme/login-pyme.component';
import { RegisterPymeComponent } from './register-pyme/register-pyme.component';
import { FormPreguntasComponent } from './form-preguntas/form-preguntas.component';
import { LoginComponent } from './login/login.component';
import { PreguntasComponent } from './login/preguntas/preguntas.component';
import { CorreoComponent } from './login/correo/correo.component';
import { MetodoComponent } from './login/metodo/metodo.component';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { FirstLoginComponent } from './login/first-login/first-login.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    LoginPymeComponent,
    RegisterPymeComponent,
    FormPreguntasComponent,
    LoginComponent,
    PreguntasComponent,
    CorreoComponent,
    MetodoComponent,
    RecuperarComponent,
    FirstLoginComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }