import { Injectable } from '@angular/core';

@Injectable()
export class DateUtilsService {

  transformDateToDdMmYyyy(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  }
}
