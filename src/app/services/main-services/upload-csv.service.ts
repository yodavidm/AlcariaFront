import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadCsvService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080';

  uploadUsers(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders().set(
      'Authorization', `Bearer ${token}`);

    return this.http.post(this.baseUrl + '/admin/users/upload', formData, { headers });
  }

}
