import { throwError } from 'rxjs';
import { clientReview } from './../../../../models/clientReview.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class clientReviewService {
  private baseClientReviewUrl = 'http://localhost:8083/api/project/clientReview';


  constructor(private http: HttpClient) { }
// Les API Des Client Reviews 
getClientReviewsList(): Observable<clientReview[]> {
  return this.http.get<clientReview[]>(`${this.baseClientReviewUrl}/getAllC`);
}

getClientReviewById(id: number): Observable<clientReview> {
  return this.http.get<clientReview>(`${this.baseClientReviewUrl}/getById/${id}`);
}

/*createClientReview(clientReview: clientReview): Observable<clientReview> {
  return this.http.post(`${this.baseClientReviewUrl}/addClientReview`, clientReview).pipe(
    map((res: any) => res.clientReview as clientReview),
    catchError((err) => {
      return throwError(err);
    })
  );
}*/

createClientReview(clientReview: clientReview): Observable<Object> {
  return this.http.post(`${this.baseClientReviewUrl}/addClientReview`, clientReview);
}

updateClientReview(id: number, clientReview:clientReview): Observable<Object> {
  return this.http.put(`${this.baseClientReviewUrl}/updateClientReview/${id}`, clientReview);
}

deleteClientReview(id: number): Observable<clientReview> {
  return this.http.delete<clientReview>(`${this.baseClientReviewUrl}/delete/${id}`);
}

}
