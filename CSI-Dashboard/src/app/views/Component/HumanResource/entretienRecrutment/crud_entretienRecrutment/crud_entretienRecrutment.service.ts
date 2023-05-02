import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { delay, map } from 'rxjs/operators';
import { EgretCalendarEvent } from 'app/shared/models/event.model';
import { CalendarEventDB } from 'app/shared/inmemory-db/calendarEvents';
import { UserDB } from 'app/shared/inmemory-db/users';

@Injectable()
export class crud_entretienRecrutmentService {
  items: any[];
  constructor(
    private http: HttpClient
  ) {
    let userDB = new UserDB();
    this.items = userDB.users;
  }

  //******* Implement your APIs ********
  getItems(): Observable<any> {
    return  of(this.items.slice())
  }
  addItem(item): Observable<any> {
    item._id = Math.round(Math.random() * 10000000000).toString();
    this.items.unshift(item);
    return of(this.items.slice()).pipe(delay(1000));
  }
  updateItem(id, item) {
    this.items = this.items.map(i => {
      if(i._id === id) {
        return Object.assign({}, i, item);
      }
      return i;
    })
    return of(this.items.slice()).pipe(delay(1000));
  }
  removeItem(row) {
    let i = this.items.indexOf(row);
    this.items.splice(i, 1);
    return of(this.items.slice()).pipe(delay(1000));
  }
}
