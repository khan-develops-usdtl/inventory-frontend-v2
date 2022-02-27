import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { map } from 'rxjs/operators';
import { DepartmentsColumnsDefsService } from 'src/inventory/departments/departments-services/departments-columns-defs.service';
import { RequestFormComponent } from 'src/inventory/shared/shared-components/forms/request-form/request-form.component';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { IRequest } from '../../../departments-models/request.model';
import { BreakroomRequestService } from '../breakroom-request.service';


@Component({
  selector: 'inventory-breakroom-request-step-one',
  templateUrl: './breakroom-request-step-one.component.html',
  styleUrls: ['./breakroom-request-step-one.component.scss']
})
export class BreakroomRequestStepOneComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  isSendButtonDisabled: boolean = true
  isConfirmButtonDisabled: boolean = true
  selected: IRequest[]
  searchValue: string;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  context: any;
  confirmationSelectedItems: any;
  confirmationData: any

  constructor(
    private dialog: MatDialog,
    private _officeSupplyRequestService: BreakroomRequestService,
    private _updaterService: UpdaterService,
    private _departmentsColumnsDefsService: DepartmentsColumnsDefsService,
  ) { }

  ngOnInit(): void {
    this.getSpecialRequestItems()
    this.defaultColDef = this._departmentsColumnsDefsService.getRequestDefaultColDef()
    this.columnDefs = this._departmentsColumnsDefsService.getRequestColumnDefs()
  }

  getSpecialRequestItems(): void {
    this.rowData = this._officeSupplyRequestService.getBreakroomRequestItems().pipe(map(officeSupplyItemsRes => {
      return officeSupplyItemsRes.map(officeSupplyItem => ({
        ...officeSupplyItem,
        item: officeSupplyItem.master.item,
        purchase_unit: officeSupplyItem.master.purchase_unit,
        part_number: officeSupplyItem.master.part_number,
        recent_cn: officeSupplyItem.master.recent_cn,
        comments: officeSupplyItem.master.comments,
        category: officeSupplyItem.master.category
      }))
    }))
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selected = selectedNodes.map(node => node.data)
    this.selected = selected
    this.isSendButtonDisabled = selected.length === 0
  }

  handleSendRequest() {
    this.openDialog()
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selected
    this.dialog.open(RequestFormComponent, dialogConfig).afterClosed().subscribe(() => {
      this.gridApi.deselectAll()
      this._updaterService.setOfficeSupplyRequestUpdater(true)
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
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        minWidth: 50,
        maxWidth: 50,
      },
      {
        headerName: 'Item ID',
        field: 'item_id',
        maxWidth: 100,
      },
      { headerName: 'Item', field: 'item', minWidth: 450 },
      { headerName: 'Recent CN', field: 'recent_cn' },
      { headerName: 'Purchase Unit', field: 'purchase_unit' },
      { headerName: 'Part Number', field: 'part_number' },
      { headerName: 'Comments', field: 'comments', }
    ]
  }

  getDefaultColDef() {
    return this.defaultColDef = {
      resizable: true,
      sortable: true,
      floatingFilter: true
    }
  }
}


