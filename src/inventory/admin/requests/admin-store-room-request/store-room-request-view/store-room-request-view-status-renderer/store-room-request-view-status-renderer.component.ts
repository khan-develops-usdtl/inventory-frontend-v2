import { Component } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IRequestView } from 'src/inventory/admin/admin-models/requestView.model';
import { SnackbarService } from 'src/inventory/shared/shared-components/snackbar/snackbar.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { StoreRoomRequestViewService } from '../store-room-request-view.service';

@Component({
  selector: 'inventory-store-room-request-view-status-renderer',
  templateUrl: './store-room-request-view-status-renderer.component.html',
  styleUrls: ['./store-room-request-view-status-renderer.component.scss']
})
export class StoreRoomRequestViewStatusRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(
    private _storeRoomRequestViewService: StoreRoomRequestViewService,
    private _snackbarService: SnackbarService,
    private _updaterService: UpdaterService
  ) { }

  statuses = ['completed', 'pending', 'cancelled', 'ordered', 'back ordered', 'partial receipt']

  rowItem: IRequestView
  selected: string
  storeRoomRequestViewComponent: any

  agInit(params: ICellRendererParams): void {
    this.rowItem = params.data
    this.selected = this.getValueToDisplay(params)
    this.storeRoomRequestViewComponent = params.context.storeRoomRequestViewComponent
  }

  refresh(params: ICellRendererParams): any {
    this.rowItem = params.data
    this.selected = this.getValueToDisplay(params)
  }

  updateStatus(value: string) {
    const data = { ...this.rowItem, status: value, time_updated: new Date() }
    this._storeRoomRequestViewService.updateRequestViewItem(data.id, data).subscribe({
      next: (storeRoomItemRes) => {
        this.storeRoomRequestViewComponent.getRequestViewtems()
        this.selected = value
      },
      error: () => this._snackbarService.openSnackbar(`item was updated unsuccessfully`, 'ERROR')
    })
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
