import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { IRequest } from '../../../departments-models/request.model';
import { ConfirmationDialogService } from 'src/inventory/shared/shared-components/dialog/confirmation-dialog/confirmation-dialog.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { OfficeSupplyRequestService } from '../office-supply-request.service';
import { EmailService } from 'src/inventory/shared/services/email.service';
import { AuthService } from 'src/inventory/auth/auth.service';


@Component({
  selector: 'inventory-office-supply-request-step-two',
  templateUrl: './office-supply-request-step-two.component.html',
  styleUrls: ['./office-supply-request-step-two.component.scss']
})
export class OfficeSupplyRequestStepTwoComponent implements OnInit {
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
    private _officeSupplyRequestService: OfficeSupplyRequestService,
    private _confirmationDialogService: ConfirmationDialogService,
    private _updaterService: UpdaterService,
    private _emailService: EmailService
  ) { }

  ngOnInit(): void {
    this._updaterService.currentOfficeSupplyRequestUpdater.subscribe({
      next: () => this.getUnconfirmedRequestItems()
    })
    this.getUnconfirmedRequestItems()
    this.getDefaultColDef()
    this.getColumnDefs()
  }

  getUnconfirmedRequestItems() {
    this.rowData = this._officeSupplyRequestService.getOfficeSupplyRequestItems().pipe(map(officeSupplyRequestItemsRes => {
      return officeSupplyRequestItemsRes.filter(officeSupplyRequestItem => officeSupplyRequestItem.is_confirmed === false).map(officeSupplyRequestItem => {
        return officeSupplyRequestItem
      }).map(officeSupplyRequestItem => ({
        ...officeSupplyRequestItem,
        item: officeSupplyRequestItem.master.item,
        recent_cn: officeSupplyRequestItem.master.recent_cn
      }))
    }))
  }

  handleUpdate(officeSupplyRequestItem: any) {
    this._officeSupplyRequestService.updateOfficeSupplyRequestItem(officeSupplyRequestItem.data.id, officeSupplyRequestItem.data).subscribe({
      next: (officeSupplyRequestItem) => {
        this.getUnconfirmedRequestItems()
      }
    })
  }

  handleDelete() {
    this._confirmationDialogService.confirmationDialog("Would you like to delete selected items?").afterClosed().subscribe({
      next: res => {
        if (res === true) {
          this.selected.map(specialRequestItem => {
            this._officeSupplyRequestService.deleteOfficeSupplyRequestItem(specialRequestItem.id).subscribe(() => {
              this.getUnconfirmedRequestItems()
              this.isDeleteButtonDisabled = true
            }

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
          this.selected.map(officeSupplyRequestItem => ({
            ...officeSupplyRequestItem,
            is_confirmed: true
          })).map(officeSupplyRequestItem => {
            this._officeSupplyRequestService.updateOfficeSupplyRequestItem(officeSupplyRequestItem.id, officeSupplyRequestItem).subscribe(() => {
            this.getUnconfirmedRequestItems()
            this._updaterService.setOfficeSupplyRequestUpdater(true)
            })
          })
        }
      },
      error: () => {},
      complete: () => this._emailService.sendOfficeSuppyRequestEmail({ items: this.selected, user: this._authService.currentUser(), type: 'Office Supply' }).subscribe()
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
        headerName: 'Custom Text', field:
          'custom_text',
        editable: true
      },
      {
        headerName: 'Time Requested', field: 'time_requested', valueFormatter: function (params: any) {
          return moment(params.data.time_requested).format('MM/DD/YYYY hh:mm:ss a')
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
