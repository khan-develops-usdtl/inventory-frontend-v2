import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/inventory/shared/constants';
import { IRequest } from '../../departments-models/request.model';

@Injectable({
  providedIn: 'root'
})
export class StoreRoomRequestService {
  constructor(
    private _http: HttpClient
  ) { }

  getStoreRoomItems(): Observable<IRequest[]> {
    return this._http.get<IRequest[]>(`${Constants.url}/store-room`)
  }

  getStoreRoomRequestItems(): Observable<IRequest[]> {
    return this._http.get<IRequest[]>(`${Constants.url}/store-room-requests`)
  }

  createStoreRoomRequestItem(requestItem: IRequest): Observable<IRequest> {
    return this._http.post<IRequest>(`${Constants.url}/store-room-requests`, requestItem)
  }

  updateStoreRoomRequestItem(id: number, requestItem: IRequest): Observable<IRequest> {
    return this._http.patch<IRequest>(`${Constants.url}/store-room-requests/${id}`, requestItem)
  }

  deleteStoreRoomRequestItem(id: number) {
    return this._http.delete<IRequest>(`${Constants.url}/store-room-requests/${id}`)
  }
}
