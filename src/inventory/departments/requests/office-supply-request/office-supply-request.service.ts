import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/inventory/shared/constants';
import { IRequest } from '../../departments-models/request.model';

@Injectable({
  providedIn: 'root'
})
export class OfficeSupplyRequestService {
  constructor(
    private _http: HttpClient
  ) { }

  getOfficeSupplyItems(): Observable<IRequest[]> {
    return this._http.get<IRequest[]>(`${Constants.url}/office-supply`)
  }

  getOfficeSupplyRequestItems(): Observable<IRequest[]> {
    return this._http.get<IRequest[]>(`${Constants.url}/office-supply-requests`)
  }

  createOfficeSupplyRequesttem(requestItem: IRequest): Observable<IRequest> {
    return this._http.post<IRequest>(`${Constants.url}/office-supply-requests`, requestItem)
  }

  updateOfficeSupplyRequestItem(id: number, requestItem: IRequest): Observable<IRequest> {
    return this._http.patch<IRequest>(`${Constants.url}/office-supply-requests/${id}`, requestItem)
  }

  deleteOfficeSupplyRequestItem(id: number) {
    return this._http.delete<IRequest>(`${Constants.url}/office-supply-requests/${id}`)
  }
}
