import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRequestView } from 'src/inventory/admin/admin-models/requestView.model';
import { Constants } from 'src/inventory/shared/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficeSupplyItemsService {

  constructor(
    private _http: HttpClient
  ) { }

  getOfficeSupplyItems(): Observable<IRequestView[]> {
    return this._http.get<IRequestView[]>(`${Constants.url}/office-supply`)
  }

  deleteOfficeSupplyItem(id: number) {
    return this._http.delete<IRequestView>(`${Constants.url}/office-supply/${id}`)
  }
}
