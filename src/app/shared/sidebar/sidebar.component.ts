import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems:any[];
  //menuItems2:any[];

  constructor(private _sideBarService: SidebarService, private router:Router){
    this.menuItems = this._sideBarService.menu;
    //this.menuItems2 = this.sideBarService.empresas;
  }

  ngOnInit(): void {

  }

  logout(){
    this.router.navigateByUrl('/login');
    localStorage.clear();
  }
}
