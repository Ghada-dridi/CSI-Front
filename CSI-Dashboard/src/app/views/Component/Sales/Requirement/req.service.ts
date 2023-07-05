import { req } from 'app/shared/models/req';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RequestedProfile } from 'app/shared/models/RequestedProfile';


@Injectable({ providedIn: 'root'})
export class ReqService {
  private apiUrl = 'http://localhost:8085/crm/requirements';
  private apiUrl1 = 'http://localhost:8085/crm/requestedProfiles';
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
    addReq(customer: any): Observable<any> {
      
      return this.http.post<any>(this.apiUrl, customer).pipe(
        catchError(this.handleError)
      );
    }
  
    // PUT an existing item
    updateReq(id: number, customer: req): Observable<req> {
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

    ////////////////////////requested profiles///////////////////////////////////////
    getProfiles(): Observable<RequestedProfile[]> {
      return this.http.get<RequestedProfile[]>(this.apiUrl1).pipe(
        catchError(this.handleError)
      );
    }

    // GET addresses list by partner id
    getItemProfiles(id: number): Observable<RequestedProfile[]> {
      const url = `${this.apiUrl}/${id}/profiles`;
      return this.http.get<RequestedProfile[]>(url).pipe(
        catchError(this.handleError)
      )
    }
  
     // GET an item by id
     getProfile(id: number): Observable<RequestedProfile> {
      const url = `${this.apiUrl1}/${id}`;
      return this.http.get<RequestedProfile>(url).pipe(
        catchError(this.handleError)
      );
    }
  
    // POST a new item
    addProfile(profile: any): Observable<any> {
      console.log(profile)
      return this.http.post<any>(this.apiUrl1, profile).pipe(
        catchError(this.handleError)
      );
    }
  
    // PUT an existing item
    updateProfile(id: number, data: any): Observable<RequestedProfile> {
      console.log('Updating profile with ID:', id, 'and data:', data);
      const url = `${this.apiUrl1}/${id}`;
      const requestPayload = { ...data, id }
      return this.http.put<RequestedProfile>(url, requestPayload).pipe(
        catchError(this.handleError)
      );
    }
  
    // DELETE an item by id
    deleteProfile(id: number): Observable<RequestedProfile> {
      const url = `${this.apiUrl1}/${id}`;
      return this.http.delete<RequestedProfile>(url).pipe(
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
