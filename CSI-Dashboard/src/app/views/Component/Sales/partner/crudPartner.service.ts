import { Partner } from '../../../../shared/models/Partner';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable,  of,  throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import * as countrycitystatejson from 'countrycitystatejson';
import { req } from 'app/shared/models/req';
import { map } from 'rxjs-compat/operator/map';
import { contact } from 'app/shared/models/contact';
import { socialMedia } from 'app/shared/models/socialMedia';
import { address } from 'app/shared/models/address';
import { ContactListComponent } from '../contact/contact-list/contact-list/contact-list.component';

@Injectable()
export class CrudPartnerService {
  private apiUrl = 'http://localhost:8085/crm/partners';
  private apiUrl2 = 'http://localhost:8085/crm/addresses';
   private apiUrl3 = 'http://localhost:8085/crm/contacts';
   private apiUrl4 = 'http://localhost:8085/crm/requirements';
  private countryData = countrycitystatejson;
  constructor(private http: HttpClient)
     {  }



  //******* Implement your APIs ********
  getItems(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }


   // GET an item by id
   getItem(id: number): Observable<Partner> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Partner>(url).pipe(
      catchError(this.handleError)
    );
  }

  // GET requirements list by partner id
  
  getItemReq(id: number): Observable<req[]> {
    const url = `${this.apiUrl}/${id}/requirements`;
    return this.http.get<req[]>(url).pipe(
      catchError(this.handleError)
    );
  }
  // GET contacts list by partner id
  getItemContact(id: number): Observable<contact[]> {
    const url = `${this.apiUrl}/${id}/contacts`;
    return this.http.get<contact[]>(url).pipe(
      catchError(this.handleError)
    );
  }
  getItemSocialMedias(id: number): Observable<socialMedia[]> {
    const url = `${this.apiUrl}/${id}/socialMedias`;
    return this.http.get<socialMedia[]>(url).pipe(
      catchError(this.handleError)
    );
  }
   getItemAddresses(id: number): Observable<address[]> {
    const url = `${this.apiUrl}/${id}/addresses`;
    return this.http.get<address[]>(url).pipe(
      catchError(this.handleError)
    );
  }
  /*getrequirement(id: number): Observable<req[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Partner>(url).pipe(map(partner => partner.requirements),
    catchError(error => {
      console.error(error);
      return of([]);
    }));
  }*/

  // POST a new item
  addItem(customer: any): Observable<any> {
    
    return this.http.post<any>(this.apiUrl, customer).pipe(
      catchError(this.handleError)
    );
  }

  // PUT an existing item
  updateItem(id: number, customer: Partner): Observable<Partner> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Partner>(url, customer).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE an item by id
  deleteItem(id: number): Observable<Partner> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Partner>(url).pipe(
      catchError(this.handleError)
    );
  }
  deleteAddress(id: number): Observable<address> {
    const url = `${this.apiUrl2}/${id}`;
    return this.http.delete<address>(url).pipe(
      catchError(this.handleError)
    );
  }
  deleteContact(id: number): Observable<contact> {
    const url = `${this.apiUrl3}/${id}`;
    return this.http.delete<contact>(url).pipe(
      catchError(this.handleError)
    );
  }
  deleteBesoin(id: number): Observable<req> {
    const url = `${this.apiUrl4}/${id}`;
    return this.http.delete<req>(url).pipe(
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
  getCountries() {
    return this.countryData.getCountries();
  }

  getStatesByCountry(name: string) {
    return this.countryData.getStatesByShort(name);
  }

  uploadPartnerLogo(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${this.apiUrl}/${id}/image`;
    return this.http.post(url, formData);
  }

  getPartnerLogo(id: number): Observable<Blob> {
    const url = `${this.apiUrl}/${id}/image`;
    return this.http.get(url, { responseType: 'blob' });
  }
}

