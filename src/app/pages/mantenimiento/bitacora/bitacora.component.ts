import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Bitacora } from 'src/app/interfaces/bitacora';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent {
  bitacora: Bitacora[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
}
