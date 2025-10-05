import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserResponse } from '../../interfaces/dash-faces/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/admin/users';

  getUsers(): Observable<UserResponse[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set(
      'Authorization', `Bearer ${token}`);

    return this.http.get<any>(this.baseUrl,{headers}).pipe(
          map(response => response._embedded.userResponseModelList));
  }

}
