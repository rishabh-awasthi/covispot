import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
//https://corona.lmao.ninja/v2/countries/:query?yesterday&strict&query  India, Nepal, Bangladesh, Pakistan, Bhutan, Sri Lanka, Maldives
constructor(private http: HttpClient) {}
httpOptions = {};

getData(query:string): Observable<any> {
  return this.http.get(
    'https://corona.lmao.ninja/v2/countries/'+ query+'?yesterday&strict',
    this.httpOptions
  );
}
}