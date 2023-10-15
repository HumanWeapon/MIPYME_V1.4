import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CommonModule } from '@angular/common';
import { RegisterPymeComponent } from './register-pyme/register-pyme.component';
import { LoginPymeComponent } from './login-pyme/login-pyme.component';
import { FormPreguntasComponent } from './form-preguntas/form-preguntas.component';
import { LoginComponent } from './login/login.component';
import { MetodoComponent } from './login/metodo/metodo.component';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { CorreoComponent } from './login/correo/correo.component';
import { PreguntasComponent } from './login/preguntas/preguntas.component';
import { FirstLoginComponent } from './login/first-login/first-login.component';





const routes: Routes =[
  {path: 'login', component: LoginComponent},
  {path: 'loginpyme', component: LoginPymeComponent},
  {path: 'registerpyme', component: RegisterPymeComponent},
  {path: 'metodo', component: MetodoComponent},
  {path: 'preguntas', component: PreguntasComponent},
  {path: 'correo', component: CorreoComponent},
  {path: 'recuperar', component: RecuperarComponent},
  {path: 'firstlogin', component: FirstLoginComponent},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
