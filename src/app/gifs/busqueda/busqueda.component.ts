import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  
  /* Buscar el elemento referencia en el html y lo asigna a la variable
  ! = asegura que el elemento no es nulo  */
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  buscar( ){
    const valor = this.txtBuscar.nativeElement.value;
    if (valor.trim().length == 0) {
      return;
    }
    
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }

  constructor(private gifsService : GifsService) { }

  ngOnInit(): void {
  }
  
 
}
