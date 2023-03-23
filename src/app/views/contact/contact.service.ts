import { Injectable } from '@angular/core';
import { contact } from 'app/shared/models/Contact';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl2 = 'http://localhost:8085/crm/contacts';
  constructor(private http: HttpClient) { }

  getItems(): Observable<contact[]> {
    return this.http.get<contact[]>(this.apiUrl2).pipe(
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
  deleteItem(id: number): Observable<contact> {
    const url = `${this.apiUrl2}/${id}`;
    return this.http.delete<contact>(url).pipe(
      catchError(this.handleError)
    );
  }
}
