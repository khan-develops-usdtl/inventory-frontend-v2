import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from 'src/inventory/auth/profile/profile.model';
import { Constants } from 'src/inventory/shared/constants';
import { IStoreRoom } from './store-room.model';

@Injectable({
  providedIn: 'root'
})
export class StoreRoomService {

  constructor(
    private _http: HttpClient
  ) { }

  getStoreRoomItems(): Observable<IStoreRoom[]> {
    return this._http.get<IStoreRoom[]>(`${Constants.url}/store-room`)
  }

  createStoreRoomItem(storeRoomItem: IStoreRoom): Observable<IStoreRoom> {
    return this._http.post<IStoreRoom>(`${Constants.url}/store-room`, storeRoomItem)
  }

  updateItem(id: number, storeRoomItem: IStoreRoom, currentUser: IProfile): Observable<IStoreRoom> {
    return this._http.patch<IStoreRoom>(
      `${Constants.url}/store-room/${id}`,
      { storeRoomItem: storeRoomItem, currentUser: currentUser }
    )
  }

  deleteStoreRoomItem(id: number) {
    return this._http.delete(`${Constants.url}/store-room/${id}`)
  }

  sendEmailReport() {
    return this._http.get(`${Constants.url}/store-room/email`)
  }
}
