import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMaster } from 'src/inventory/admin/master/master.model';
import { Constants } from 'src/inventory/shared/constants';
import { IDepartment } from '../departments-models/departments.model';
import { IProfile } from 'src/inventory/auth/profile/profile.model';
import { IChemical } from './chemicals.model';

@Injectable({
  providedIn: 'root'
})
export class ChemicalsService {
  constructor(
    private _http: HttpClient
  ) { }

  getTotalItems(): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/chemicals/total`)
  }

  getMasterChemicalItems(): Observable<IMaster[]> {
    return this._http.get<IMaster[]>(`${Constants.url}/master/chemicals`)
  }

  getTotalItem(item_id: number): Observable<IDepartment> {
    return this._http.get<IDepartment>(`${Constants.url}/chemicals/total/${item_id}`)
  }

  getItemsByMasterId(item_id: number): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/chemicals/master/${item_id}`)
  }
  getItems(): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(`${Constants.url}/chemicals`)
  }

  deleteItem(id: number) {
    return this._http.delete(`${Constants.url}/chemicals/${id}`)
  }

  createItem(departmentItem: IDepartment): Observable<IDepartment> {
    return this._http.post<IDepartment>(`${Constants.url}/chemicals`, departmentItem)
  }
  
  updateItem(id: number, departmentItem: IDepartment, currentUser: IProfile,): Observable<IDepartment> {
    return this._http.patch<IDepartment>(
      `${Constants.url}/chemicals/${id}`, 
      { departmentItem: departmentItem, currentUser: currentUser, }
      )
  }
  
  updateChemicalItem(id: number, chemicalItem: IChemical): Observable<IChemical> {
    return this._http.patch<IChemical>(`${Constants.url}/chemicals/${id}`, chemicalItem)
  }
  sendEmailReport() {
    return this._http.get(`${Constants.url}/chemicals/email`)
  }
}


