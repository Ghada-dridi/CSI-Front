import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment } from 'app/shared/models/equipment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private apiUrl = 'http://localhost:8084/rh/equipment';

  constructor(private http : HttpClient) { 
  }

    getEquipments(): Observable<Equipment[]> {
      return this.http.get<Equipment[]>(this.apiUrl + '/getAll').pipe(
        catchError(this.handleError)
      );
    }
    
    getEquipment(id: number): Observable<Equipment> {
      const url = `${this.apiUrl}/getById/${id}`;
      return this.http.get<Equipment>(url).pipe(
        catchError(this.handleError)
      );
    }
     // POST a new item
  addEquipment(equipment: any): Observable<any> {
    const url = `${this.apiUrl}/add`;
    return this.http.post<any>(url, equipment).pipe(
      catchError(this.handleError)
    );
  }
  
  // PUT an existing item
  updateEquipment(id: number, equipment: Equipment): Observable<Equipment> {
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.put<Equipment>(url, equipment).pipe(
      catchError(this.handleError)
    );
  }
    
     // DELETE  Resource by id
     deleteEquipment(id: number): Observable<any> {
      const url = `${this.apiUrl}/delete/${id}`;
      return this.http.delete<any>(url).pipe(
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
