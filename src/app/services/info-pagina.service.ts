import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada: boolean = false;
  equipo: any[] = [];
  urlBase = 'https://portfolio-app-9fbd5-default-rtdb.firebaseio.com/equipo.json';

  constructor( private http: HttpClient ) {

    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    //leer el json
    this.http.get('assets/data/data-page.json')
      .subscribe( ( resp: InfoPagina ) => {
        this.cargada = true;
        this.info = resp;
      })
  }

  private cargarEquipo() {
    this.http.get(this.urlBase)
      .subscribe( (resp: any ) => {
        this.equipo = resp;
      })
  }
}
