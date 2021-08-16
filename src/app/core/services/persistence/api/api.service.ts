import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constants } from '../../../constants/constants';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private httpClient: HttpClient
  ) { }

  private formatErrors(error: any): Observable<never> {
    let errorMessages: Array<string>;

    if (error.status === 400 && typeof error.error === 'string') {
      errorMessages = error.error.split(';');
    } else {
      errorMessages = [Constants.errors.unexpected];
    }

    console.error(error);
    return throwError(errorMessages);
  }

  get(url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${url}`, { params })
      .pipe(catchError(this.formatErrors));
  }
}
