import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  baseUrl= 'https://portfolio-app-9fbd5-default-rtdb.firebaseio.com'
  constructor( private http: HttpClient ) {

    this.cargarProductos();
  }

    private cargarProductos() {
      this.http.get(`${this.baseUrl}/productos_idx.json`)
        .subscribe( ( resp: any )  => {
          this.productos = resp;
          console.log(resp);
          this.cargando = false;
        })
    }

}
