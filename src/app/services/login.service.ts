import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request';
import { TokenResponse } from '../interfaces/token-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

    private baseUrl = 'http://localhost:8080/auth';
  
  
    doLogin(login: LoginRequest): Observable<TokenResponse> {
      return this.http.post<TokenResponse>(this.baseUrl + '/login', login);
    }

    doLoginActivate(login: LoginRequest) : Observable<TokenResponse>{
      return this.http.post<TokenResponse>(this.baseUrl + '/activate-account',login);
    }

}
