import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gift.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private api_key: string = '0YcejsAST9n36Z1ZV09S4OSFQool4SLn';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[]=[];
  
  //TODO: cambiar any 
  public resultados:Gif[]=[];
  
    
  constructor(private http: HttpClient) { 
    /* Guardar en el local storade las busquedas */
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }


  get historial(){

    return [...this._historial]; /* romper la referencia para no cambiar le arreglo original, retorna un nuevo arreglo */
  }

  buscarGifs(query: string){
    
   
    query =(query.trim().toLocaleLowerCase())
    /* include pregunta si existe  */
    if ( !this._historial.includes( query )) {
      this._historial.unshift(query);
      /* Unshift es uinsertar al inicio de un array */
      this._historial = this.historial.slice(0,10); 
      /* Grabar een el local storage */
      localStorage.setItem('historial', JSON.stringify(this._historial));

      /* corta el array */
    }
     
    /* se crea una interfaz de tipo SearchGifsResponse */
    /* query params */
    const params = new HttpParams().set('api_key', this.api_key).set('limit', '10').set('q', query);

    console.log(params.toString());

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
    .subscribe ( (resp ) => {
        console.log(resp.data); 
        /* this.resultados = resp.data; */
        localStorage.setItem('resultados', JSON.stringify(this.resultados));

    });

   /*  fetch('https://api.giphy.com/v1/gifs/search?api_key=0YcejsAST9n36Z1ZV09S4OSFQool4SLn&q=dragon ball z=10').then( resp => {
      resp.json().then( data => {
        console.log(data);
      })
    }) */
    
    
    console.log(this._historial);
  }
  
}
