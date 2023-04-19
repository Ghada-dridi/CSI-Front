import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { contract, exceptionalFee } from './../../../../../shared/models/contract';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private apiUrl = 'http://localhost:8084/rh/contract';
  private apiUrlFee = 'http://localhost:8084/rh/exceptionalFees';

  constructor(private http: HttpClient) {

   }




  // POST a new item
  addItem(contract: any): Observable<any> {
    const url = `${this.apiUrl}/addContract`;
    return this.http.post<any>(url, contract).pipe(
      catchError(this.handleError)
    );
  }

  addExceptinalFee(exceptionalFee: any): Observable<any> {
    const url = `${this.apiUrlFee}/add`;
    return this.http.post<any>(url, exceptionalFee).pipe(
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
