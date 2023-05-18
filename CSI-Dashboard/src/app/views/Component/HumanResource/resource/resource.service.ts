import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from 'app/shared/models/Resource';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
 
  private apiUrl = 'http://localhost:8084/rh/employee';

  constructor(private http: HttpClient) { 

  }
/******* API InternalResource ********/
 // Get All InetrnalResource
getItems(): Observable<Resource[]> {
  return this.http.get<Resource[]>(this.apiUrl + '/getAllResourcesInterne').pipe(
    catchError(this.handleError)
  );
}

getItem(id: number): Observable<Resource> {
  const url = `${this.apiUrl}/get/${id}`;
  return this.http.get<Resource>(url).pipe(
    catchError(this.handleError)
  );
}

 // DELETE  Resource by id
 deleteItem(id: number): Observable<Resource> {
  const url = `${this.apiUrl+'/delete'}/${id}`;
  return this.http.delete<Resource>(url).pipe(
    catchError(this.handleError)
  );
}
/******* API ExternalResource ********/
 // Get All ExternaResource
getItemsExternal(): Observable<Resource[]> {
  return this.http.get<Resource[]>(this.apiUrl + '/getAllResourcesExterne').pipe(
    catchError(this.handleError)
  );
}

/******* API BackOfficeResource ********/
 // Get All BackOfficeResource
getItemsBackOffice(): Observable<Resource[]> {
  return this.http.get<Resource[]>(this.apiUrl + '/getAllResourcesBackOffice').pipe(
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
