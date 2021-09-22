import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private hhtp: HttpClient) { }

  private baseUrl: string = environment.baseUrl

  login(){
    return this.hhtp.get<Auth>(`${this.baseUrl}/usuarios/1`);
  }
}
