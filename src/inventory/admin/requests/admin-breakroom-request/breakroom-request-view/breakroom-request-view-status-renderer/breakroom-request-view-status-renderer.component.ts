import { Component } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IRequestView } from 'src/inventory/admin/admin-models/requestView.model';
import { SnackbarService } from 'src/inventory/shared/shared-components/snackbar/snackbar.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { BreakroomRequestViewService } from '../breakroom-request-view.service';

@Component({
  selector: 'inventory-breakroom-request-view-status-renderer',
  templateUrl: './breakroom-request-view-status-renderer.component.html',
  styleUrls: ['./breakroom-request-view-status-renderer.component.scss']
})
export class BreakroomRequestViewStatusRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(
    private _breakroomRequestViewService: BreakroomRequestViewService,
    private _snackbarService: SnackbarService,
    private _updaterService: UpdaterService
  ) { }
  statuses = ['Completed', 'Pending', 'Cancelled', 'Ordered', 'Back Ordered', 'Partial Receipt']
  rowItem: IRequestView
  selected: string

  agInit(params: ICellRendererParams): void {
    this.rowItem = params.data
    this.selected = this.getValueToDisplay(params)
  }

  refresh(params: ICellRendererParams): any {
    this.rowItem = params.data
    this.selected = this.getValueToDisplay(params)
  }

  updateStatus(value: string) {
    const data = { ...this.rowItem, status: value }
    this._breakroomRequestViewService.updateRequestViewItem(data.id, data).subscribe({
      next: () => {
        this._updaterService.setBreakroomRequestUpdater(true)
      },
      error: () => this._snackbarService.openSnackbar(`item was updated unsuccessfully`, 'ERROR')
    })
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
