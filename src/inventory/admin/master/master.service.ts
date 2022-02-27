import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from 'src/inventory/shared/constants';
import { IMaster } from './master.model';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
    private _http: HttpClient
  ) { }

  getMasterItems(): Observable<IMaster[]> {
    return this._http.get<IMaster[]>(`${Constants.url}/master`)
  }
  getMasterItem(id: number): Observable<IMaster> {
    return this._http.get<IMaster>(`${Constants.url}/master/${id}`)
  }
  assigItem(id: number, departments: string[]): Observable<IMaster> {
    return this._http.patch<IMaster>(`${Constants.url}/master/${id}/assign`, departments)
  }
  updateMasterItem(id: number, masterItem: IMaster): Observable<IMaster> {
    return this._http.patch<IMaster>(`${Constants.url}/master/${id}`, masterItem)
  }
  createMasterItem(masterItem: IMaster): Observable<IMaster> {
    return this._http.post<IMaster>(`${Constants.url}/master`, masterItem)
  }
  deleteMasterItem(id: number) {
    return this._http.delete(`${Constants.url}/master/${id}`)
  }

  private masterItems = new BehaviorSubject<IMaster[]>([])
  currentMasterItems = this.masterItems.asObservable()
  setMasterItems(masterItems: IMaster[]) {
    this.masterItems.next(masterItems)
  }

  private masterItemsSelected = new BehaviorSubject<{ department: string, masterItems: IMaster[] }>({ department: '', masterItems: [] })
  currentMasterItemsSelected = this.masterItemsSelected.asObservable()
  setMasterItemsSelected(masterItems: { department: string, masterItems: IMaster[] }) {
    this.masterItemsSelected.next(masterItems)
  }

  private isMasterItemChanged = new BehaviorSubject<boolean>(false)
  currentIsMasterItemsChanged = this.isMasterItemChanged.asObservable()
  setIsMasterItemChanged(value: boolean) {
    this.isMasterItemChanged.next(value)
  }

}
