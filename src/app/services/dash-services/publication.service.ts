import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PubliRequest } from '../../interfaces/dash-faces/publi-request';
import { map, Observable } from 'rxjs';
import { PubliResponse } from '../../interfaces/dash-faces/publi-response';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {


  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/publications';

  addPublication(request: PubliRequest): Observable<PubliResponse> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set(
      'Authorization', `Bearer ${token}`);

    return this.http.post<PubliResponse>(this.baseUrl + '/add', request, { headers });
  }

  getPublications(): Observable<PubliResponse[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.baseUrl, { headers }).pipe(
      map(response => response._embedded.publicationResponseModelList)
    );
  }

  getPublicationById(id: string): Observable<PubliResponse> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<PubliResponse>(this.baseUrl + '/' + id, { headers });
  }
}
