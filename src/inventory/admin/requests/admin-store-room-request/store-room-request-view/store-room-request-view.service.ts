import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/inventory/shared/constants';
import { IRequestView } from '../../../admin-models/requestView.model';

@Injectable({
  providedIn: 'root'
})
export class StoreRoomRequestViewService {
  constructor(
    private _http: HttpClient
  ) { }

  getRequestViewItems(): Observable<IRequestView[]> {
    return this._http.get<IRequestView[]>(`${Constants.url}/store-room-requests`)
  }

  getStoreRoomItems(): Observable<IRequestView[]> {
    return this._http.get<IRequestView[]>(`${Constants.url}/store-room`)
  }

  createRequestViewItem(requestItem: IRequestView): Observable<IRequestView> {
    return this._http.post<IRequestView>(`${Constants.url}/store-room-requests`, requestItem)
  }

  updateRequestViewItem(id: number, requestItem: IRequestView): Observable<IRequestView> {
    return this._http.patch<IRequestView>(`${Constants.url}/store-room-requests/${id}`, requestItem)
  }

  deleteRequestViewItem(id: number) {
    return this._http.delete<IRequestView>(`${Constants.url}/store-room-requests/${id}`)
  }
}
