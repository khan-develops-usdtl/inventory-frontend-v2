import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from 'src/inventory/auth/profile/profile.model';
import { Constants } from 'src/inventory/shared/constants';
import { IDepartment } from '../../departments/departments-models/departments.model';
import { IShipping } from './shipping.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(
    private _http: HttpClient
  ) { }

  getShippingItems(): Observable<IShipping[]> {
    return this._http.get<IShipping[]>(`${Constants.url}/shipping`)
  }

  deleteItem(id: number) {
    return this._http.delete(`${Constants.url}/shipping/${id}`)
  }

  createItem(departmentItem: IDepartment): Observable<IDepartment> {
    return this._http.post<IDepartment>(`${Constants.url}/shipping`, departmentItem)
  }
  
  updateItem(id: number, departmentItem: IShipping, currentUser: IProfile): Observable<IShipping> {
    return this._http.patch<IShipping>(
      `${Constants.url}/shipping/${id}`, 
      { departmentItem: departmentItem, currentUser: currentUser }
      )
  }

  sendEmailReport() {
    return this._http.get(`${Constants.url}/shipping/email`)
  }
}
