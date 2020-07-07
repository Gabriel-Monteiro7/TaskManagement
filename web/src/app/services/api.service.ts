import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  readonly API = `${environment.API}/tasks`;
  private tasks = [];
  getTasks(token): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.API}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        delay(1500),
        take(1)
        // , tap(console.log)
      );
  }
  getTask(token, id) {
    return this.http
      .get<any>(`${this.API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(take(1));
  }
  deleteTask(token, id) {
    return this.http
      .delete<any>(`${this.API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(take(1));
  }
  private insertTask(token, task) {
    return this.http
      .post<any>(`${this.API}`, task, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(take(1));
  }
  private updateTask(token, task) {
    return this.http
      .put<any>(`${this.API}/${task.id}`, task, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(take(1));
  }
  save(token, task) {
    if (task.id === null) {
      return this.insertTask(token, task);
    }
    return this.updateTask(token, task);
  }
}
