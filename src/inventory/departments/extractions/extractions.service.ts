import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from 'src/inventory/auth/profile/profile.model';
import { Constants } from 'src/inventory/shared/constants';
import { IDepartment } from '../departments-models/departments.model';


@Injectable({
  providedIn: 'root'
})
export class ExtractionsService {

  constructor(
    private _http: HttpClient
  ) { }

  getTotalItems(): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/extractions/total`)
  }

  getTotalItem(item_id: number): Observable<IDepartment> {
    return this._http.get<IDepartment>(`${Constants.url}/extractions/total/${item_id}`)
  }

  getItemsByMasterId(item_id: number): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/extractions/master/${item_id}`)
  }

  getItems(): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/extractions`)
  }

  getItem(id: number): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/extractions/${id}`)
  }

  deleteExtractionItem(id: number) {
    return this._http.delete(`${Constants.url}/extractions/${id}`)
  }

  createItem(departmentItem: IDepartment): Observable<IDepartment> {
    return this._http.post<IDepartment>(`${Constants.url}/extractions`, departmentItem)
  }

  updateItem(id: number, departmentItem: IDepartment, currentUser: IProfile): Observable<IDepartment> {
    return this._http.patch<IDepartment>(
      `${Constants.url}/extractions/${id}`, 
      { departmentItem: departmentItem, currentUser: currentUser, }
      )
  }

  sendEmailReport() {
    return this._http.get(`${Constants.url}/extractions/email`)
  }
}
