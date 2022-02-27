import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/inventory/shared/constants';
import { IRequest } from '../../departments-models/request.model';

@Injectable({
  providedIn: 'root'
})
export class BreakroomRequestService {
  constructor(
    private _http: HttpClient
  ) { }

  getBreakroomItems(): Observable<IRequest[]> {
    return this._http.get<IRequest[]>(`${Constants.url}/breakroom`)
  }

  getBreakroomRequestItems(): Observable<IRequest[]> {
    return this._http.get<IRequest[]>(`${Constants.url}/breakroom-requests`)
  }

  createBreakroomRequesttem(requestItem: IRequest): Observable<IRequest> {
    return this._http.post<IRequest>(`${Constants.url}/breakroom-requests`, requestItem)
  }

  updateBreakroomRequestItem(id: number, requestItem: IRequest): Observable<IRequest> {
    return this._http.patch<IRequest>(`${Constants.url}/breakroom-requests/${id}`, requestItem)
  }

  deleteBreakroomRequestItem(id: number) {
    return this._http.delete<IRequest>(`${Constants.url}/breakroom-requests/${id}`)
  }
}
