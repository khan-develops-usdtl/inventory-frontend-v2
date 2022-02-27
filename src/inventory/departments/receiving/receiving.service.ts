import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from 'src/inventory/auth/profile/profile.model';
import { Constants } from 'src/inventory/shared/constants';
import { IDepartment } from '../departments-models/departments.model';

@Injectable({
  providedIn: 'root'
})
export class ReceivingService {
  constructor(
    private _http: HttpClient
  ) { }

  getTotalItems(): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/receiving/total`)
  }

  getTotalItem(item_id: number): Observable<IDepartment> {
    return this._http.get<IDepartment>(`${Constants.url}/receiving/total/${item_id}`)
  }

  getItemsByMasterId(item_id: number): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/receiving/master/${item_id}`)
  }

  getItems(): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/receiving`)
  }

  deleteItem(id: number) {
    return this._http.delete(`${Constants.url}/receiving/${id}`)
  }

  createItem(departmentItem: IDepartment): Observable<IDepartment> {
    return this._http.post<IDepartment>(`${Constants.url}/receiving`, departmentItem)
  }
  
  updateItem(id: number, departmentItem: IDepartment, currentUser: IProfile,): Observable<IDepartment> {
    return this._http.patch<IDepartment>(
      `${Constants.url}/receiving/${id}`, 
      { departmentItem: departmentItem, currentUser: currentUser, }
      )
  }

  sendEmailReport() {
    return this._http.get(`${Constants.url}/receiving/email`)
  }
}
