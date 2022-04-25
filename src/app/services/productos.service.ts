
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  baseUrl= 'https://portfolio-app-9fbd5-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) {

    this.cargarProductos();
  }

    private cargarProductos() {
      return new Promise( ( resolve, reject) => {
        this.http.get(`${this.baseUrl}/productos_idx.json`)
        .subscribe( ( resp: any )  => {
          this.productos = resp;
          this.cargando = false;
        })
        })
    }

    getProducto( id: string ) {
      return this.http.get(`${this.baseUrl}/productos/${ id }.json `)
    }

    buscarProduicto( termino: string) {
      //condicional para cargar productos === 0
      if( this.productos.length === 0) {

        this.cargarProductos().then( () => {
          this.filtrarProductos( termino );
        });
      } else {
        this.filtrarProductos( termino );
      }
      //aplicar fuilro

    }

    private filtrarProductos( termino: string ) {

      this.productosFiltrado = [];

      termino = termino.toLowerCase();
      this.productos.forEach( producto => {

        const tituloLower = producto.titulo.toLowerCase();

        if( producto.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
          this.productosFiltrado.push( producto )
        }
      })
    }
}
