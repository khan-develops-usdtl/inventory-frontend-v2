import { Component } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IRequestView } from 'src/inventory/admin/admin-models/requestView.model';
import { SnackbarService } from 'src/inventory/shared/shared-components/snackbar/snackbar.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { GeneralRequestViewService } from '../general-request-view.service';

@Component({
  selector: 'inventory-general-request-view-status-renderer',
  templateUrl: './general-request-view-status-renderer.component.html',
  styleUrls: ['./general-request-view-status-renderer.component.scss']
})
export class GeneralRequestViewStatusRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(
    private _generalRequestViewService: GeneralRequestViewService,
    private _snackbarService: SnackbarService,
    private _updaterService: UpdaterService
  ) { }
  statuses = ['completed', 'pending', 'cancelled', 'ordered', 'back ordered', 'partial receipt']
  rowItem: IRequestView
  selected: string
  generalRequestViewComponent: any

  agInit(params: ICellRendererParams): void {
    this.rowItem = params.data
    this.selected = this.getValueToDisplay(params)
    this.generalRequestViewComponent = params.context.generalRequestViewComponent
  }

  refresh(params: ICellRendererParams): any {
    this.rowItem = params.data
    this.selected = this.getValueToDisplay(params)
  }

  updateStatus(value: string) {
    const data = { ...this.rowItem, status: value, time_updated: new Date() }
    this._generalRequestViewService.updateRequestViewItem(data.id, data).subscribe({
      next: () => {
        this._updaterService.setGeneralRequestUpdater(true);
        this.generalRequestViewComponent.getRequestIViewtems()
      },
      error: () => this._snackbarService.openSnackbar(`item was updated unsuccessfully`, 'ERROR')
    })
    
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
