import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from 'src/inventory/auth/profile/profile.model';
import { Constants } from 'src/inventory/shared/constants';
import { IDepartment } from '../departments-models/departments.model';

@Injectable({
  providedIn: 'root'
})
export class RdService {
  constructor(
    private _http: HttpClient
  ) { }

  getTotalItems(): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/r&d/total`)
  }

  getItems(): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/r&d`)
  }

  getTotalItem(item_id: number): Observable<IDepartment> {
    return this._http.get<IDepartment>(`${Constants.url}/r&d/total/${item_id}`)
  }

  getItemsByMasterId(item_id: number): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/r&d/master/${item_id}`)
  }

  deleteItem(id: number) {
    return this._http.delete(`${Constants.url}/r&d/${id}`)
  }

  createItem(departmentItem: IDepartment): Observable<IDepartment> {
    return this._http.post<IDepartment>(`${Constants.url}/r&d`, departmentItem)
  }
  
  updateItem(id: number, departmentItem: IDepartment, currentUser: IProfile,): Observable<IDepartment> {
    return this._http.patch<IDepartment>(
      `${Constants.url}/r&d/${id}`, 
      { departmentItem: departmentItem, currentUser: currentUser, }
      )
  }

  sendEmailReport() {
    return this._http.get(`${Constants.url}/r&d/email`)
  }
}
