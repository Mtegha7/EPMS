import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // public backendUrl = `http://localhost:8080/dekha/api`; //this is the URL for the backend server in production
  public backendUrl = `http://192.168.1.80:8080/dekha/api`; //this is the URL for the backend server in production

  constructor(
    private http: HttpClient,
  ) { }

  public postNoAuthorization(endpoint: string, data: any) {
    return this.http.post(`${this.backendUrl}/${endpoint}`, data);
  }
  public getNoAuthorization(endpoint: string) {
    return this.http.get(`${this.backendUrl}/${endpoint}`);
  }

  public postNoAuthorizationURL(endpoint: string, data: any) {
    return this.http.post(`${endpoint}`, data);
  }
  public getNoAuthorizationURL(endpoint: string) {
    return this.http.get(`${endpoint}`);
  }



  public getToken() {
    try {
      const storedToken: string = localStorage.getItem('token') || '';
      // const token = storedToken;
      return storedToken;
    } catch (e) {
      return 'nothing';
    }
  }

  public get(endpoint: string) {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());
    const httpOptions = {
      headers: header
    };
    return this.http.get(`${this.backendUrl}/${endpoint}`, httpOptions);
  }

  public getCall(endpoint: string) {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());
    const httpOptions = {
      headers: header
    };
    return this.http.get(`${endpoint}`, httpOptions);
  }

  public post(endpoint: string, data: any) {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());
    const httpOptions = {
      headers: header
    };
    return this.http.post(`${this.backendUrl}/${endpoint}`, data, httpOptions);
  }

  public delete_data(endpoint: string, data: any) {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());
    const httpOptions = {
      headers: header
    };
    return this.http.post(`${this.backendUrl}/${endpoint}`, data, httpOptions);
  }

  public delete(endpoint: string) {
    let header;

    header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());

    const httpOptions = {
      headers: header
    };
    return this.http.delete(`${this.backendUrl}/${endpoint}`, httpOptions);
  }

  public update(endpoint: string, data: any) {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());
    const httpOptions = {
      headers: header
    };
    return this.http.put(`${this.backendUrl}/${endpoint}`, data, httpOptions);
  }


  public patch(endpoint: string, data: any) {
    let header;

    header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());

    const httpOptions = {
      headers: header
    };
    return this.http.patch(`${this.backendUrl}/${endpoint}`, data, httpOptions);
  }
}
