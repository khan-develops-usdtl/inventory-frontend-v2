import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  helper = new JwtHelperService();

  constructor() { }

  getUser() {
    const token: string = localStorage.getItem('token') || ''
    if(token) {
      return this.helper.decodeToken(token)
    }
    return null
  }
}