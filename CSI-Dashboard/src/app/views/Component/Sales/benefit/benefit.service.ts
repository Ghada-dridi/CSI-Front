import { req } from 'app/shared/models/req';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { extraDuty } from 'app/shared/models/extraDuty';
import { workArrangement } from 'app/shared/models/workArrangement';


@Injectable()
export class BenefitService {
  private apiUrl = 'http://localhost:8085/crm/benefits';
  private apiUrl3 = 'http://localhost:8085/crm/extraDuties';
  constructor(private http: HttpClient) { }

    //******* Implement your APIs ********
    getItems(): Observable<req[]> {
      return this.http.get<req[]>(this.apiUrl).pipe(
        catchError(this.handleError)
      );
    }
  
  
     // GET an item by id
     getItem(id: number): Observable<req> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<req>(url).pipe(
        catchError(this.handleError)
      );
    }
  
    // POST a new item
    addItem(customer: any): Observable<any> {
      
      return this.http.post<any>(this.apiUrl, customer).pipe(
        catchError(this.handleError)
      );
    }
  
    // PUT an existing item
    updateItem(id: number, customer: req): Observable<req> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.put<req>(url, customer).pipe(
        catchError(this.handleError)
      );
    }
  
    // DELETE an item by id
    deleteItem(id: number): Observable<req> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<req>(url).pipe(
        catchError(this.handleError)
      );
    }

    // GET extra duties list by partner id
    getItemExtraDuties(id: number): Observable<extraDuty[]> {
      const url = `${this.apiUrl}/${id}/extraDuties`;
      return this.http.get<extraDuty[]>(url).pipe(
        catchError(this.handleError)
      );
    }

    // GET work arrangements list by partner id
    getItemWorkArrangements(id: number): Observable<workArrangement[]> {
      const url = `${this.apiUrl}/${id}/workArrangements`;
      return this.http.get<workArrangement[]>(url).pipe(
        catchError(this.handleError)
      );
    }

    deleteExtraDuty(id: number): Observable<extraDuty> {
      const url = `${this.apiUrl3}/${id}`;
      return this.http.delete<extraDuty>(url).pipe(
        catchError(this.handleError)
      );
    }

    //ajouter une modalité de travail à une prestation donnée
    addWorkArrangement(address: any): Observable<any> {
    
      return this.http.post<any>(this.apiUrl, address).pipe();
    }

    //modifier une modalité de travail d'une prestation donnée
    updateWorkArrangement(id: number, workArrangement: workArrangement): Observable<workArrangement> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.put<workArrangement>(url, workArrangement).pipe();
    }

    //ajouter une activité exceptionnelle à une prestation donnée
    addExtraDuty(address: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, address).pipe();
    }

    //modifier une activité exceptionnelle d'une prestation donnée
    updateExtraDuty(id: number, extraDuty: extraDuty): Observable<extraDuty> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.put<extraDuty>(url, extraDuty).pipe();
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
