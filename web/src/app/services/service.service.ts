import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, delay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private Eventsigned = new EventEmitter<boolean>();
  signed: any = JSON.parse(localStorage.getItem('signed')) || null;
  private user: any = JSON.parse(localStorage.getItem('user')) || null;
  private token: any = JSON.parse(localStorage.getItem('token')) || '';
  readonly API = environment.API;
  constructor(private http: HttpClient, private router: Router) {
    this.signed = JSON.parse(localStorage.getItem('signed'));
  }
  private register(user) {
    try {
      return this.http.post<any>(`${this.API}/user`, user).pipe(take(1));
    } catch (error) {}
  }
  private login(user) {
    try {
      return this.http.post<any>(`${this.API}/session`, user).pipe(take(1));
    } catch (error) {
      console.log(error);
    }
  }
  logout() {
    localStorage.clear();
    this.setToken('');
    this.setUser({});
    this.signed = false;
    this.Eventsigned.emit(false);
    this.router.navigate(['/']);
  }
  forgotPassword(email: any) {
    try {
      return this.http
        .post<any>(`${this.API}/forgetpassword`, { email })
        .pipe(take(1));
    } catch (error) {}
  }
  userManagement(user) {
    if (user.name === undefined) {
      return this.login(user);
    }
    return this.register(user);
  }
  getUser() {
    return this.user;
  }
  setUser(user) {
    this.user = user;
  }
  setUserLogin(success) {
    console.log(success);
    this.signed = true;
    localStorage.setItem('user', JSON.stringify(success.user));
    localStorage.setItem('token', JSON.stringify(success.token));
    localStorage.setItem('signed', JSON.stringify(true));
    this.setToken(success.token);
    this.setUser(success.user);
    this.Eventsigned.emit(true);
    this.router.navigate(['/home']);
  }
  getSigned() {
    return this.Eventsigned;
  }
  getToken() {
    return this.token;
  }
  setToken(token) {
    this.token = token;
  }
}
