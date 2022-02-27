import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { IRequest } from '../../../departments-models/request.model';
import { GeneralRequestService } from '../general-request.service';
import { ConfirmationDialogService } from 'src/inventory/shared/shared-components/dialog/confirmation-dialog/confirmation-dialog.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { EmailService } from 'src/inventory/shared/services/email.service';
import { AuthService } from 'src/inventory/auth/auth.service';


@Component({
  selector: 'inventory-general-request-step-two',
  templateUrl: './general-request-step-two.component.html',
  styleUrls: ['./general-request-step-two.component.scss']
})
export class GeneralRequestStepTwoComponent implements OnInit {
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
    private _generalRequestService: GeneralRequestService,
    private _confirmationDialogService: ConfirmationDialogService,
    private _updaterService: UpdaterService,
    private _emailService: EmailService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._updaterService.currentGeneralRequestUpdater.subscribe({
      next: () => this.getUnconfirmedGeneralRequestItems()
    })
    this.getUnconfirmedGeneralRequestItems()
    this.getDefaultColDef()
    this.getColumnDefs()
  }



  getUnconfirmedGeneralRequestItems() {
    this.rowData = this._generalRequestService.getGeneralRequestItems().pipe(map(generalRequestItemsRes => {
      return generalRequestItemsRes.filter(generalRequestItem => generalRequestItem.is_confirmed === false).map(generalRequestItem => {
        return generalRequestItem
      }).map(generalRequestItem => ({
        ...generalRequestItem,
        item: generalRequestItem.master.item,
        recent_cn: generalRequestItem.master.recent_cn
      }))
    }))
  }

  handleUpdate(generalRequestItem: any) {
    this._generalRequestService.updateGeneralRequestItem(generalRequestItem.data.id, generalRequestItem.data).subscribe({
      next: () => {
        this.getUnconfirmedGeneralRequestItems()
      }
    })
  }

  handleDelete() {
    this._confirmationDialogService.confirmationDialog("Would you like to delete selected items?").afterClosed().subscribe({
      next: res => {
        if (res === true) {
          this.selected.map(specialRequestItem => {
            this._generalRequestService.deleteGeneralRequestItem(specialRequestItem.id).subscribe(() => this.getUnconfirmedGeneralRequestItems()
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
    this.isDeleteButtonDisabled = selected.length === 0
  }


  handleConfirmation() {
    this._confirmationDialogService.confirmationDialog("Would you like to send selected request?").afterClosed().subscribe({
      next: res => {
        if (res === true) {
          this.selected.map(generalRequestItem => ({
            ...generalRequestItem,
            is_confirmed: true,
          })).map(generalRequestItem => {
            this._generalRequestService.updateGeneralRequestItem(generalRequestItem.id, generalRequestItem).subscribe(() => {
              this.getUnconfirmedGeneralRequestItems()
              this._updaterService.setGeneralRequestUpdater(true)

            })
          })
        }
      },
      error: () => { },
      complete: () => { this._emailService.sendGeneralRequestEmail({ items: this.selected, user: this._authService.currentUser(), type: 'General' }).subscribe() }
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
