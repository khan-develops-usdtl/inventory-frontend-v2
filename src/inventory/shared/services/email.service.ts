import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private _http: HttpClient
  ) { }

  sendGeneralRequestEmail(specialRequestItems: any) {
    return this._http.post(`${Constants.url}/email/general-request`, specialRequestItems)
  }

  sendOfficeSuppyRequestEmail(specialRequestItems: any) {
    return this._http.post(`${Constants.url}/email/office-supply-request`, specialRequestItems)
  }

  sendStoreRoomRequestEmail(specialRequestItems: any) {
    return this._http.post(`${Constants.url}/email/storeroom-request`, specialRequestItems)
  }
}
