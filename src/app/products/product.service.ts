import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Product } from './product';


@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private productUrl = 'api/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productUrl).pipe(
            tap(data => console.log('getProducts: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<Product> {
        if (id === 0) {
            return of(this.initProduct());
        }
        const url = `${this.productUrl}/${id}`;
        return this.http.get<Product>(url).pipe(
            tap(data => 'getProduct:' + console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private initProduct(): Product {
        return {
            id: 0,
            productName: null,
            productCode: null,
            tags: [''],
            releaseDate: null,
            price: null,
            description: null,
            imageUrl: null,
            starRating: null
        };
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
