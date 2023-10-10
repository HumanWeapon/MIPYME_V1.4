import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './pages/inicio/perfil/perfil.component';


const routes: Routes = [
  {path:'' ,redirectTo:'login', pathMatch:'full'},
  { path: 'perfil', component: PerfilComponent },
  {path:'**', component:NopageFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule,
    CommonModule
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
