import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorldTimeService {

  readonly API_ENDPOINT = 'http://worldtimeapi.org/api/timezone';

  constructor(private httpClient: HttpClient) {

  }

  httpHeader() {

    return {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  httpError(error: ErrorEvent | HttpErrorResponse | any) {

    let msg = '';
    if(error.error instanceof ErrorEvent) {

      // client side error
      msg = error.error.message;
    } else if (error instanceof HttpErrorResponse) {

      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    } else {
      // server side error
      msg = `Error Code: ${error}\n`;
    }
    console.log(msg);
    return throwError(msg);
  }

  getTimezones (): Observable<any> {

    return this.httpClient.get<any>(this.API_ENDPOINT)
      .pipe(
        retry(1),
        catchError(this.httpError)
    );
  }

  getAreaTimezones (area: string): Observable<any> {

    return this.httpClient.get<any>(this.API_ENDPOINT + '/' + area)
      .pipe(
        retry(1),
        catchError(this.httpError)
    );
  }

  getCurrentTimeLocation (areaLocation: string): Observable<any> {

    return this.httpClient.get<any>(this.API_ENDPOINT + '/' + areaLocation, this.httpHeader())
      .pipe(
        retry(1),
        catchError(this.httpError)
    );
  }
}
