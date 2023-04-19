import { Injectable } from '@angular/core';
import { contact } from 'app/shared/models/contact';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,  of,  throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { address } from 'app/shared/models/address';
@Injectable({
  providedIn: 'root'
})
export class AddAddressService {
  private apiUrl = 'http://localhost:8085/crm/addresses';
  
  constructor(private http: HttpClient) { }

  addAddress(address: any): Observable<any> {
    
    return this.http.post<any>(this.apiUrl, address).pipe();
  }
  updateAddress(id: number, address: address): Observable<address> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<address>(url, address).pipe();
  }

}