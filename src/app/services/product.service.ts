import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../interfaces/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private productsCache: Product[] | null = null;

  constructor(private http: HttpClient) { }

  //based on https://youtu.be/k0MPZxqzu8k?si=FVNuqJbStMkY-4Lv
  getProducts(): Observable<Product[]> {
    if (this.productsCache) {
      return of(this.productsCache);
    }
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this.productsCache = products)
    );
  }

  getProductById(id: number): Observable<Product> {
    if (this.productsCache) {
      const product = this.productsCache.find(p => p.id === id);
      return of(product!);
    }
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
