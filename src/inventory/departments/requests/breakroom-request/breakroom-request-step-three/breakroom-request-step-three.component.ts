import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { BreakroomRequestService } from '../breakroom-request.service';


@Component({
  selector: 'inventory-breakroom-request-step-three',
  templateUrl: './breakroom-request-step-three.component.html',
  styleUrls: ['./breakroom-request-step-three.component.scss']
})
export class BreakroomRequestStepThreeComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  searchValue: string;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;

  constructor(
    private _breakroomRequestService: BreakroomRequestService,
    private _updateService: UpdaterService,
  ) { }

  ngOnInit(): void {
    this._updateService.currentGeneralRequestUpdater.subscribe({
      next: () => this.getConfirmedSpecialRequestItems()
    })
    this.getColumnDefs()
    this.getDefaultColDef()
    this.getConfirmedSpecialRequestItems()
  }

  getConfirmedSpecialRequestItems() {
    this.rowData = this._breakroomRequestService.getBreakroomRequestItems().pipe(map(requestItemsRes => {
      return requestItemsRes.filter(requestItem => requestItem.is_confirmed === true).map(requestItem => {
        return requestItem
      }).map(requestItem => ({
        ...requestItem,
        item: requestItem.master.item,
        recent_cn: requestItem.master.recent_cn
      }))
    }))
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
    return this.columnDefs = [
      {
        headerName: 'Item_ID',
        field: 'item_id',
        maxWidth: 110,
        minWidth: 110,
        checkboxSelection: true,
        suppressMenu: true,
        filter: 'agNumberColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Item',
        field: 'item',
        minWidth: 350,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Recent CN',
        field: 'recent_cn',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
      },
      {
        headerName: 'Status',
        field: 'status',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Time Requested',
        field: 'time_requested', valueFormatter: function (params: any) {
          return moment(params.data.time_requested).format('MM/DD/YYYY hh:mm:ss a')
        }
      },
      {
        headerName: 'Time Updated',
        field: 'time_updated', valueFormatter: function (params: any) {
          return params.data.time_updated ? moment(params.data.time_updated).format('MM/DD/YYYY hh:mm:ss a') : null
        }
      },
      {
        headerName: 'Comment',
        field: 'comment',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
    ]
  }

  getDefaultColDef() {
    return this.defaultColDef = {
      resizable: true,
      sortable: true,
      floatingFilter: true,
    }
  }
}

