import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Partner } from 'app/shared/models/Partner';
import * as countrycitystatejson from 'countrycitystatejson';
import { FormGroup } from '@angular/forms';
import { FileModel } from 'app/shared/models/file';

@Injectable()
export class CrudService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private apiUrl = 'http://localhost:8085/crm/partners';
  private countryData = countrycitystatejson;
  choixMenu : string = "A";
  listData : Partner[];
  public dataForm : FormGroup;


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

  // POST a new item
  // addItem(partner:Partner , /* file: File*/): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('partner',JSON.stringify(partner));
  //   const headers = new HttpHeaders();
  //   headers.append('Accept', 'application/json');
  //   return this.http.post<any>(this.apiUrl,formData, 
  //     { headers }).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  addItem(data:any):Observable<any>{
    console.log('test11')
    return this.http.post<any>(this.apiUrl,data)
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
  convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const FileInfo :FileModel= {
          fileContent: reader.result as string,
          filename: encodeURIComponent(file.name),
          mimetype: file.type,
          id: 0
        }
        resolve(FileInfo);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
  
}

