import { benefit } from './../../../../../shared/models/avantagesContrat';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { contract } from 'app/shared/models/contract';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContractEmployeeService {

  private apiUrl = 'http://localhost:8084/rh/contract';
  private apiUrlFee = 'http://localhost:8084/rh/exceptionalFees';
 private apiUrlBenefit ='http://localhost:8084/rh/Benefit' 

  constructor(private http: HttpClient) { }


  getItems(): Observable<contract[]> {
    return this.http.get<contract[]>(this.apiUrl + '/getAll').pipe(
      catchError(this.handleError)
    );
  }
  addItem(contract: any): Observable<any> {
    const url = `${this.apiUrl}/addContract`;
    return this.http.post<any>(url, contract).pipe(
      catchError(this.handleError)
    );
  }
 // DELETE an item by id
 deleteItem(id: number): Observable<contract> {
  const url = `${this.apiUrl}/deleteContract/${id}`;
  return this.http.delete<contract>(url).pipe(
    catchError(this.handleError)
  );
}
addExceptinalFee(exceptionalFee: any): Observable<any> {
  const url = `${this.apiUrlFee}/add`;
  return this.http.post<any>(url, exceptionalFee).pipe(
    catchError(this.handleError)
  );
}
addBenefit(benefit: any): Observable<any> {
  const url = `${this.apiUrlBenefit}/add`;
  return this.http.post<any>(url, benefit).pipe(
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
