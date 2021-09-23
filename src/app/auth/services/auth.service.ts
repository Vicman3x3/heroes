import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private hhtp: HttpClient) {}

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  login() {
    return this.hhtp.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((auth) => (this._auth = auth)),
      tap((auth) => localStorage.setItem('token', auth.id))
    );
  }

  get auth(): Auth {
    return { ...this._auth! };
  }

  verificaAutentificacion(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }
    return this.hhtp.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map((auth) => {
        this._auth = auth;
        return true;
      })
    );
  }
}
