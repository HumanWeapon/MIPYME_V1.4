import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Bitacora } from 'src/app/interfaces/bitacora';
import { BitacoraService } from 'src/app/services/bitacora.service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit{

  bitacora: Bitacora[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private _bitacoraService: BitacoraService,
    private toastr: ToastrService){}

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      language: {url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'},
      responsive: true
    };
    this._bitacoraService.getBitacora().subscribe((res: any) =>{
      this.bitacora = res;
      this.dtTrigger.next(0);
    })
  }
  deleteBitacora(){
    this._bitacoraService.DeleteBitacora().subscribe( data=>{
      this.toastr.success('La bitácora se ha limpiado exitosamente')
      location.reload();
      
    })
  }
}
