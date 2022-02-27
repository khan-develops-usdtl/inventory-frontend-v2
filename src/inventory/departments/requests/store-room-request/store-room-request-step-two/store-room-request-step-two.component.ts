import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { ConfirmationDialogService } from 'src/inventory/shared/shared-components/dialog/confirmation-dialog/confirmation-dialog.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { IRequest } from '../../../departments-models/request.model';
import { StoreRoomRequestService } from '../store-room-request.service';
import { AuthService } from 'src/inventory/auth/auth.service';
import { EmailService } from 'src/inventory/shared/services/email.service';


@Component({
  selector: 'inventory-store-room-request-step-two',
  templateUrl: './store-room-request-step-two.component.html',
  styleUrls: ['./store-room-request-step-two.component.scss']
})
export class StoreRoomRequestStepTwoComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  isDeleteButtonDisabled: boolean = true
  isConfirmButtonDisabled: boolean = true
  selected: IRequest[]
  requestType: string;
  searchValue: string;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;

  constructor(
    private _authService: AuthService,
    private _emailService: EmailService,
    private _storeRoomRequestService: StoreRoomRequestService,
    private _confirmationDialogService: ConfirmationDialogService,
    private _updaterService: UpdaterService,
  ) { }

  ngOnInit(): void {
    this._updaterService.currentStoreRoomRequestUpdater.subscribe({
      next: () => this.getUnconfirmedStoreRoomRequestItems()
    })
    this.getUnconfirmedStoreRoomRequestItems()
    this.getDefaultColDef()
    this.getColumnDefs()
  }

  

  getUnconfirmedStoreRoomRequestItems() {
    this.rowData = this._storeRoomRequestService.getStoreRoomRequestItems().pipe(map(requestItemsRes => {
      return requestItemsRes.filter(requestItem => requestItem.is_confirmed === false).map(requestItem => {
        return requestItem
      }).map(requestItem => ({
        ...requestItem,
        item: requestItem.master.item,
        recent_cn: requestItem.master.recent_cn
      }))
    }))
  }

  handleUpdate(StoreRoomRequestItem: any) {
    this._storeRoomRequestService.updateStoreRoomRequestItem(StoreRoomRequestItem.data.id, StoreRoomRequestItem.data).subscribe({
      next: (StoreRoomRequestItem) => {
        this.getUnconfirmedStoreRoomRequestItems()
      }
    })
  }

  handleDelete() {
    this._confirmationDialogService.confirmationDialog("Would you like to delete selected items?").afterClosed().subscribe({
      next: res => {
        if (res === true) {
          this.selected.map(specialRequestItem => {
            this._storeRoomRequestService.deleteStoreRoomRequestItem(specialRequestItem.id).subscribe(() => 
            this.getUnconfirmedStoreRoomRequestItems()
            )
          })

        }
      }
    })
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selected = selectedNodes.map(node => node.data)
    this.selected = selected
    console.log(selected)
    this.isDeleteButtonDisabled = selected.length === 0
  }


  handleConfirmation() {
    this._confirmationDialogService.confirmationDialog("Would you like to send selected request?").afterClosed().subscribe({
      next: res => {
        if (res === true) {

          this.selected.map(generalRequestItem => ({
            ...generalRequestItem,
            is_confirmed: true
          })).map(generalRequestItem => {
            this._storeRoomRequestService.updateStoreRoomRequestItem(generalRequestItem.id, generalRequestItem).subscribe(() => {
            this.getUnconfirmedStoreRoomRequestItems()
            this._updaterService.setGeneralRequestUpdater(true)
            })
          })
        }
      },
      error: () => {},
      complete: () => this._emailService.sendStoreRoomRequestEmail({ items: this.selected, user: this._authService.currentUser(), type: 'Store Room' }).subscribe()
    })
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  handleSearch(value: string) {
    this.gridApi.setQuickFilter(value);
  }

  handleClearSearch() {
    this.searchValue = ''
    this.handleSearch(this.searchValue)
  }

  getColumnDefs() {
    this.columnDefs = [
      {
        headerName: 'Item ID',
        field: 'item_id',
        maxWidth: 110,
        minWidth: 110,
        checkboxSelection: true,

      },
      {
        headerName: 'Item',
        field: 'item',
        minWidth: 350
      },
      {
        headerName: 'Recent CN',
        field: 'recent_cn',
      },
      {
        headerName: 'Quantity', field:
          'quantity',
        editable: true
      },
      {
        headerName: 'Time Requested', field: 'time_requested', valueFormatter: function (params: any) {
          return params.data.time_requested ? moment(params.data.time_requested).format('MM/DD/YYYY hh:mm:ss a') : null
        }
      },
    ]
  }

  getDefaultColDef() {
    return this.defaultColDef = {
      resizable: true,
      sortable: true,
    }
  }
}
