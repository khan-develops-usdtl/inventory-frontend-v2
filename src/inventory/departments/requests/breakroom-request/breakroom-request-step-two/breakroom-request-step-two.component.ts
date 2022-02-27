import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { Router } from '@angular/router';
import { IRequest } from '../../../departments-models/request.model';
import { ConfirmationDialogService } from 'src/inventory/shared/shared-components/dialog/confirmation-dialog/confirmation-dialog.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { BreakroomRequestService } from '../breakroom-request.service';


@Component({
  selector: 'inventory-breakroom-request-step-two',
  templateUrl: './breakroom-request-step-two.component.html',
  styleUrls: ['./breakroom-request-step-two.component.scss']
})
export class BreakroomRequestStepTwoComponent implements OnInit {
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
    private _router: Router,
    private _breakroomRequestService: BreakroomRequestService,
    private _confirmationDialogService: ConfirmationDialogService,
    private _updaterService: UpdaterService,
  ) { }

  ngOnInit(): void {
    this._updaterService.currentBreakroomRequestUpdater.subscribe({
      next: () => this.getUnconfirmedRequestItems()
    })
    this.getUnconfirmedRequestItems()
    this.getDefaultColDef()
    this.getColumnDefs()
  }

  

  getUnconfirmedRequestItems() {
    this.rowData = this._breakroomRequestService.getBreakroomRequestItems().pipe(map(officeSupplyRequestItemsRes => {
      return officeSupplyRequestItemsRes.filter(officeSupplyRequestItem => officeSupplyRequestItem.is_confirmed === false).map(officeSupplyRequestItem => {
        return officeSupplyRequestItem
      }).map(officeSupplyRequestItem => ({
        ...officeSupplyRequestItem,
        item: officeSupplyRequestItem.master.item,
        recent_cn: officeSupplyRequestItem.master.recent_cn
      }))
    }))
  }

  handleUpdate(value: any) {

  }

  handleDelete() {
    this._confirmationDialogService.confirmationDialog("Would you like to delete selected items?").afterClosed().subscribe({
      next: res => {
        if (res === true) {
          this.selected.map(specialRequestItem => {
            this._breakroomRequestService.deleteBreakroomRequestItem(specialRequestItem.id).subscribe(() => 
            this.getUnconfirmedRequestItems()
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
            is_confirmed: true
          })).map(generalRequestItem => {
            this._breakroomRequestService.updateBreakroomRequestItem(generalRequestItem.id, generalRequestItem).subscribe(() => {
            this.getUnconfirmedRequestItems()
            this._updaterService.setOfficeSupplyRequestUpdater(true)
            })
          })
        }
      }
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
