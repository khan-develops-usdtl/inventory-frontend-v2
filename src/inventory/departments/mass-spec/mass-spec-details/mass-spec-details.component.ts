import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { MasterService } from 'src/inventory/admin/master/master.service';
import { SnackbarService } from 'src/inventory/shared/shared-components/snackbar/snackbar.service';
import { DepartmentsColumnsDefsService } from '../../departments-services/departments-columns-defs.service';
import { UpdaterService } from '../../../shared/shared-services/updater.service';
import { MassSpecService } from '../mass-spec.service';
import { AuthService } from 'src/inventory/auth/auth.service';
import { AdminDepartmentColumnsDefsService } from '../../departments-services/admin-columns-defs.service';
import { MassSpecExpirationRendererComponent } from '../mass-spec-expiration-renderer/mass-spec-expiration-renderer.component';
import { MassSpecReceivedRendererComponent } from '../mass-spec-received-renderer/mass-spec-received-renderer.component';

@Component({
  selector: 'inventory-mass-spec-details',
  templateUrl: './mass-spec-details.component.html',
  styleUrls: ['./mass-spec-details.component.scss']
})
export class MassSpecDetailsComponent implements OnInit {

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  rowData: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  context: any;
  frameworkComponents: any;

  constructor(
    private _authService: AuthService,
    private _updaterService: UpdaterService,
    private _departmentsColumnsDefsService: DepartmentsColumnsDefsService,
    private _adminColumnsDefsService: AdminDepartmentColumnsDefsService,
    private _snackbarService: SnackbarService,
    private _massSpecService: MassSpecService,
    private _dialog: MatDialogRef<MassSpecDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public rowItem: any,
  ) {
    this.context = { massSpecDetails: this }
    this.frameworkComponents = { 
      expirationRenderer: MassSpecExpirationRendererComponent,
      receivedRenderer: MassSpecReceivedRendererComponent
    }
   }

  ngOnInit(): void {
    if(this._authService.isLoggedIn() && this._authService.currentUser().group === 'inventory_admin') {
      this.columnDefs = this._adminColumnsDefsService.getAdminDetailsColumnsDefs()
    } else {
      this.columnDefs = this._departmentsColumnsDefsService.getDepartmentsDetailsColumnsDefs()
    }
    this.defaultColDef = this._departmentsColumnsDefsService.getDepartmentsDetailsDefaultColDef()
    this.getItemsByMasterId(this.rowItem.item_id)
  }

  getItemsByMasterId(id: number) {
    this._massSpecService.getItemsByMasterId(id).subscribe({
      next: items => {
        this.rowData = items
      }
    })
  }

  handleUpdate(rowItem: any) {
    this._massSpecService.updateItem(rowItem.data.id, rowItem.data, this._authService.currentUser(),).subscribe({
      next: (item) => {
        this._updaterService.setMassSpecUpdater(true)
        this.getItemsByMasterId(this.rowItem.item_id)
        this._massSpecService.getTotalItem(item.item_id).subscribe({
          next: totalItem => {
            this.rowItem.quantity = totalItem.quantity
          }
        })
      },
      error: () => {
        this._snackbarService.openSnackbar('Item could not be updated', 'ERROR')
      }
    })
  }

  onClose() {
    this._dialog.close()
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit()
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  autoSizeAll() {
    var allColumnIds: any[] = [];
    this.gridColumnApi.getAllColumns().forEach(function (column: { colId: any; }) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, false);
  }
}
