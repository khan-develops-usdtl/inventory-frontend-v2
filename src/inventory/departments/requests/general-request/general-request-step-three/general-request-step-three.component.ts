import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { GeneralRequestService } from '../general-request.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { Store } from '@ngrx/store';
import { IInventory } from 'src/inventory/inventory.state';

@Component({
  selector: 'inventory-general-request-step-three',
  templateUrl: './general-request-step-three.component.html',
  styleUrls: ['./general-request-step-three.component.scss']
})
export class GeneralRequestStepThreeComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  searchValue: string;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;

  constructor(
    private _generalRequestService: GeneralRequestService,
    private _updateService: UpdaterService,
    private _store: Store<IInventory>
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
    this.rowData = this._generalRequestService.getGeneralRequestItems().pipe(map(genralRequestItemsRes => {
      return genralRequestItemsRes.filter(genralRequestItem => genralRequestItem.is_confirmed === true).map(generalRequestItem => {
        return generalRequestItem
      }).map(generalRequestItem => ({
        ...generalRequestItem,
        item: generalRequestItem.master.item,
        recent_cn: generalRequestItem.master.recent_cn
      }))
    }))
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    this._store.select('search').subscribe((value) => {
      this.gridApi.setQuickFilter(value);
    })
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
          return params.data.time_requested ? moment(params.data.time_requested).format('MM/DD/YYYY hh:mm:ss a') : null
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

