import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, of, tap } from 'rxjs';
import { User } from '../core/models/user';
import { Colors, Messages } from '../core/constants/messages';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'api/users';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public openedUserForm$ = new BehaviorSubject<User | null>(null);
  public showedMessage$ = new BehaviorSubject<Array<string>>([]);

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap({
        error: (err) => this.showedMessage$.next([err, Colors.pink])
      })
    )
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, this.httpOptions).pipe(
      finalize(() => {
        this.openedUserForm$.next(null);
      }),
      tap({
        error: (err) => this.showedMessage$.next([err, Colors.pink]),
        complete: () => this.showedMessage$.next([Messages.update, Colors.green])
      })
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      finalize(() => {
        this.openedUserForm$.next(null);
      }),
      tap({
        error: (err) => this.showedMessage$.next([err, Colors.pink]),
        complete: () => this.showedMessage$.next([Messages.save, Colors.green])
      })
    );
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url, this.httpOptions).pipe(
      finalize(() => {
        this.openedUserForm$.next(null);
      }),
      tap({
        error: (err) => this.showedMessage$.next([err, Colors.pink]),
        complete: () => this.showedMessage$.next([Messages.delete, Colors.green])
      })
    );
  }
}
