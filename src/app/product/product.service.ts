import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Product } from './products/products.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<any[]> {
    const baseUrl = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get<any[]>(baseUrl)
    .pipe(
      tap(data => console.log(data)),
    )
  }

  updateProduct(product: Product): Observable<Product> {
    // const baseUrl = 'https://jsonplaceholder.typicode.com/todos';
    // return this.http.put<any>(baseUrl, JSON.stringify(product))
    // .pipe(
    //   tap(data => console.log(data)),
    // )
    return of(product)
  }

  save(product: Product): Observable<Product> {
    const id = Math.floor((Math.random()*100) + 1);
    return of({ ...product, id })
  }

  deleteProduct(product: Product): Observable<Product> {
    return of(product);
  }
}
