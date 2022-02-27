import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/inventory/shared/constants';
import { IRequest } from '../../departments-models/request.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralRequestService {

  constructor(
    private _http: HttpClient
  ) { }

  getGeneralItems(): Observable<IRequest[]> {
    return this._http.get<IRequest[]>(`${Constants.url}/general`)
  }

  getGeneralRequestItems(): Observable<IRequest[]> {
    return this._http.get<IRequest[]>(`${Constants.url}/general-requests`)
  }

  createGeneralRequestItem(requestItem: IRequest): Observable<IRequest> {
    return this._http.post<IRequest>(`${Constants.url}/general-requests`, requestItem)
  }

  updateGeneralRequestItem(id: number, requestItem: IRequest): Observable<IRequest> {
    return this._http.patch<IRequest>(`${Constants.url}/general-requests/${id}`, requestItem)
  }

  deleteGeneralRequestItem(id: number) {
    return this._http.delete<IRequest>(`${Constants.url}/general-requests/${id}`)
  }
}
