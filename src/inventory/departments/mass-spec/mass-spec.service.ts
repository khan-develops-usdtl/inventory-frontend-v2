import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from 'src/inventory/auth/profile/profile.model';
import { Constants } from 'src/inventory/shared/constants';
import { IDepartment } from '../departments-models/departments.model';

@Injectable({
  providedIn: 'root'
})
export class MassSpecService {

  constructor(
    private _http: HttpClient
  ) { }

  getItems(): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/mass-spec`)
  }

  getTotalItems(): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/mass-spec/total`)
  }

  getTotalItem(item_id: number): Observable<IDepartment> {
    return this._http.get<IDepartment>(`${Constants.url}/mass-spec/total/${item_id}`)
  }


  getItemsByMasterId(item_id: number): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/mass-spec/master/${item_id}`)
  }

  deleteItem(id: number) {
    return this._http.delete(`${Constants.url}/mass-spec/${id}`)
  }

  createItem(departmentItem: IDepartment): Observable<IDepartment> {
    return this._http.post<IDepartment>(`${Constants.url}/mass-spec`, departmentItem)
  }
  
  updateItem(id: number, departmentItem: IDepartment, currentUser: IProfile): Observable<IDepartment> {
    return this._http.patch<IDepartment>(
      `${Constants.url}/mass-spec/${id}`, 
      { departmentItem: departmentItem, currentUser: currentUser, }
      )
  }

  sendEmailReport() {
    return this._http.get(`${Constants.url}/mass-spec/email`)
  }
}
