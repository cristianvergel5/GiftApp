import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  get historial(){
    return this.giftService.historial;
  } 
  
  constructor(private giftService:GifsService) { }
  
  ngOnInit(): void {
  }
  
  buscar(termino: string){
    return this.giftService.buscarGifs(termino);
  }
}
