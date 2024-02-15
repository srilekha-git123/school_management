import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiReference } from 'src/app/constants/api-reference';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginWithUserCredentials(username: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    let body = {
      'username': username,
      'password': password
    };
    return this.http.post(ApiReference.oauthLogin, body, { headers })
      .pipe(
        map((response: any) => {
          if (response
            && response.data
            && response.data.accessToken)
            sessionStorage.setItem('session', response.data.accessToken);
          sessionStorage.setItem('username', response.data.username);
          //sessionStorage.setItem('scope', response.data.scope);
          //sessionStorage.setItem('scope', "student");
          sessionStorage.setItem('scope', "teacher");
          return response;
        })
      );
  }

  isLogged(): boolean {
    return sessionStorage.getItem('session') ? true : false;
  }

  isAdmin(): boolean {
    return ((sessionStorage.getItem('scope') === "ROLE_ADMIN,ROLE_USER") || (sessionStorage.getItem('scope') === "teacher")) ? true : false;
  }

  logout(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(ApiReference.oauthLogout, {}, { headers });
  }

  get accessToken() {
    return sessionStorage['session'] ? JSON.parse(sessionStorage['session']).access_token : null;
  }

  get refreshToken() {
    return sessionStorage['session'] ? JSON.parse(sessionStorage['session']).refresh_token : null;
  }
}
