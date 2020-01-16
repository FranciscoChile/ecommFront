import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product';
import { FilesUpload } from './filesUpload'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:8080/products";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //retorna porcentaje de subida de cada archivo
  public uploadImagesProduct(formData) {

    return this.http.post(apiUrl + '/uploadImagesProduct', formData, {
      reportProgress: true,
      observe: 'events'   
    })
    .subscribe(events => {
        if(events.type == HttpEventType.UploadProgress) {
            console.log('Upload progress: ', Math.round(events.loaded / events.total * 100) + '%');
        } else if(events.type === HttpEventType.Response) {
            console.log(events);
        }
    });

  }  

  getProducts (): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl)
      .pipe(
        tap(products => console.log('Fetch products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = '${apiUrl}/${id}';
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log('fetched product id=${id}')),
      catchError(this.handleError<Product>('getProduct id=${id}'))
    );
  }

  addProduct (product: Product): Observable<Product> {
    return this.http.post<Product>(apiUrl, product)
      .pipe(
        tap((product: Product) => console.log('added product w/ id=${product.idProduct}')),
        catchError(this.handleError('addProduct', product))
      );
  }

  
  updateProduct (product): Observable<any> {
    return this.http.post(apiUrl, product, httpOptions).pipe(
      tap(_ => console.log('updated product id=${id}')),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  updateProductMultipleImages (product): Observable<any> {
    return this.http.post(apiUrl + "/multiple-images", product).pipe(
      tap(_ => console.log('updated product id=${id}')),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct (id): Observable<Product> {
    let url = apiUrl + "/" + id;
    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log('deleted product id=${id}')),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
