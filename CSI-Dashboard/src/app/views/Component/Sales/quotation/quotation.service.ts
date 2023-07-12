import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quotation } from 'app/shared/models/Quotation';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private apiUrl = 'http://localhost:8085/crm/quotations'

  constructor(private http: HttpClient) { }

  //******* Implement your APIs ********
  getQuotations(): Observable<Quotation[]> {
    return this.http.get<Quotation[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }


   // GET an item by id
   getQuotation(id: number): Observable<Quotation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Quotation>(url).pipe(
      catchError(this.handleError)
    );
  }

  // POST a new item
  addQuotation(quotation: any): Observable<any> {
    console.log(quotation)
    return this.http.post<any>(this.apiUrl, quotation).pipe(
      catchError(this.handleError)
    );
  }

  // PUT an existing item
  updateQuotation(id: number, quotation: Quotation): Observable<Quotation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Quotation>(url, quotation).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE an item by id
  deleteQuotation(id: number): Observable<Quotation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Quotation>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
