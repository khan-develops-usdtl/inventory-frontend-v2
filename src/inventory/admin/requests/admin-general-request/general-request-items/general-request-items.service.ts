import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/inventory/shared/constants';
import { IRequestView } from '../../../admin-models/requestView.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralRequestItemsService {
  constructor(
    private _http: HttpClient
  ) { }

  getGeneralItems(): Observable<IRequestView[]> {
    return this._http.get<IRequestView[]>(`${Constants.url}/general`)
  }

  createGeneralItem(requestItem: IRequestView): Observable<IRequestView> {
    return this._http.post<IRequestView>(`${Constants.url}/general`, requestItem)
  }

  updateGeneralItem(id: number, requestItem: IRequestView): Observable<IRequestView> {
    return this._http.patch<IRequestView>(`${Constants.url}/general/${id}`, requestItem)
  }

  deleteGeneralItem(id: number) {
    return this._http.delete<IRequestView>(`${Constants.url}/general/${id}`)
  }
}