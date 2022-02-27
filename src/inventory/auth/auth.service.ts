import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from 'rxjs';
import { IInventory } from '../inventory.state';
import { setLoading } from '../shared/store/loading/loading.actions';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenExpirationTimer: any
  

  helper = new JwtHelperService();
  constructor(
    private _router: Router,
    private _store: Store<IInventory>,
    private _http: HttpClient
  ) { }

  signIn(userCredential: {username: string, password: string}) {
    this._store.dispatch(setLoading({ loading: true }))
    return this._http.post(`${Constants.userUrl}/login`, userCredential).subscribe({
      next: (res: any) => {
        const decodedToken = this.helper.decodeToken(res.accessToken)
        this.autoLogout((decodedToken.exp * 1000) - new Date().getTime())
        this._store.dispatch(setLoading({ loading: false }))
        localStorage.setItem('token', res.accessToken)
        if(decodedToken.group === 'inventory_admin') {
          this._router.navigate(['/store-room'])
        } else if (decodedToken.group === 'inventory_extractions') {
          this._router.navigate(['/extractions'])
        } else if (decodedToken.group === 'inventory_mass-spec') {
          this._router.navigate(['/mass-spec'])
        } else if (decodedToken.group === 'inventory_receiving') {
          this._router.navigate(['/receiving'])
        } else if (decodedToken.group === 'inventory_rd') {
          this._router.navigate(['/r&d'])
        } else if (decodedToken.group === 'inventory_screening') {
          this._router.navigate(['/screening'])
        } else if (decodedToken.group === 'inventory_quality') {
          this._router.navigate(['/quality'])
        } else if (decodedToken.group === 'inventory_shipping') {
          this._router.navigate(['/shipping'])
        } else if (decodedToken.group === 'inventory_safety') {
          this._router.navigate(['/general-request'])
        } else if (decodedToken.group === 'inventory_finance') {
          this._router.navigate(['/office-supply-request'])
        } else if (decodedToken.group === 'inventory_data-review') {
          this._router.navigate(['/office-supply-request'])
        }  else if (decodedToken.group === 'inventory_marketing') {
          this._router.navigate(['/office-supply-request'])
        }  else if (decodedToken.group === 'inventory_laboratory') {
          this._router.navigate(['/office-supply-request'])
        } else if (decodedToken.group === 'inventory_procurement') {
          this._router.navigate(['/store-room'])
        } else if (decodedToken.group === 'inventory_chemicals') {
          this._router.navigate(['/chemicals'])
        } else if (decodedToken.group === 'inventory_it') {
          this._router.navigate(['/general-request'])
        } else if (decodedToken.group === 'inventory_accounting') {
          this._router.navigate(['/general-request'])
        } 
      },
      error: error => {
        this._store.dispatch(setLoading({ loading: false }))
        this.updateErrorMessage('There was a problem logging in. Please use your network username and password. If problem persists, contact IT')
      }
    })
  }
  isLoggedIn(): boolean {
    const token: string = localStorage.getItem('token') || ''
    return token && !this.helper.isTokenExpired(token)
  }
  currentUser() {
    const token: string = localStorage.getItem('token') || ''
    if(token) {
      return this.helper.decodeToken(token)
    }
    return null
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(()=> {
      this.logout();
    }, expirationDuration)
  }
  logout() {
    localStorage.removeItem('token')
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
    this._router.navigate(['/auth/sign-in'])
  }

  private errorMessage = new BehaviorSubject<string>('')
  currentErrorMessage = this.errorMessage.asObservable();

  updateErrorMessage(errorMessage: string) {
    this.errorMessage.next(errorMessage)
  } 
}
