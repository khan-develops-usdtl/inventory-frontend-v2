import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { IInventory } from 'src/inventory/inventory.state';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IDepartment } from '../departments-models/departments.model';
import { SnackbarService } from 'src/inventory/shared/shared-components/snackbar/snackbar.service';
import { BottomToolbarService } from 'src/inventory/shared/shared-components/navbar/bottom-toolbar/bottom-toolbar.service';
import { ChemicalsService } from '../chemicals/chemicals.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'inventory-chemicals-raw',
  templateUrl: './chemicals-raw.component.html',
  styleUrls: ['./chemicals-raw.component.scss']
})
export class ChemicalsRawComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular | undefined;
  selected: IDepartment[]
  rowData: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  context: any;
  frameworkComponents: any;

  constructor(
    private _store: Store<IInventory>,
    private _snackbarService: SnackbarService,
    private _chemicalsService: ChemicalsService,
    private _bottomToolbarService: BottomToolbarService,
  ) {
    this.frameworkComponents = { }
    this.context = { chemicalsComponent: this }
  }

  ngOnInit(): void {
    this.getMasterChiemicalItems()
    this.getColumnsDefs()
    this.getDefaultColDef()
  }

  getMasterChiemicalItems() {
    this.rowData = this._chemicalsService.getMasterChemicalItems().pipe(map(items => {
      return items.sort((a,b) => a.id - b.id)
    }))
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    this._bottomToolbarService.currentIsExpanded.subscribe({
      next: (value) => {
        if (value) { this.autoSizeAll() }
        else { this.sizeToFit() }
      }
    })
    this._store.select('search').subscribe((value) => {
      this.gridApi.setQuickFilter(value);
    })
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selected = selectedNodes.map(node => node.data)
    this.selected = selected
    this._bottomToolbarService.setIsDeleteButtonDisabled(selected.length === 0)
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

  handleDelete($event: any) {
    this.selected.map(item => {
      this._chemicalsService.deleteItem(item.id).subscribe(() =>
        this._chemicalsService.getItems().subscribe({
          next: () => {
            this.getMasterChiemicalItems()
            this.selected = []
          }
        })
      )
    })
  }

  handleUpdate($event: any) {
    if ($event.data.chemicals) {
      const data = {
        cas: $event.data.cas === '' || $event.data.cas === undefined ? null : $event.data.cas,
        physical_state: $event.data.physical_state === '' || $event.data.physical_state === undefined ? null : $event.data.physical_state,
        container_size: $event.data.container_size === '' || $event.data.container_size === undefined ? null : $event.data.container_size,
        health_hz: $event.data.health_hz === '' || $event.data.health_hz === undefined ? null : $event.data.health_hz,
        fire_hz: $event.data.fire_hz === '' || $event.data.fire_hz === undefined ? null : $event.data.fire_hz,
        specific_hz: $event.data.specific_hz === '' || $event.data.specific_hz === undefined ? null : $event.data.specific_hz,
        special_notes: $event.data.special_notes === '' || $event.data.special_notes === undefined ? null : $event.data.special_notes,
        reactivity_hz: $event.data.reactivity_hz === '' || $event.data.reactivity_hz === undefined ? null : $event.data.reactivity_hz
      }
      this._chemicalsService.updateChemicalItem($event.data.chemicals.id, data).subscribe({
        next: data => {
            this.getMasterChiemicalItems()
        },
        error: () => {
          if($event.newValue !== '' && $event.newValue !== undefined && $event.newValue !== null) {
            this._snackbarService.openSnackbar('Item could not be updated', 'ERROR')
          }

        }
      })
    }
  }

  download() {
    this.gridApi.exportDataAsCsv()
  }

  send() {
    this._chemicalsService.sendEmailReport().subscribe({
      next: () => this._snackbarService.openSnackbar('Email has been sent', 'SUCCESS'),
      error: () => this._snackbarService.openSnackbar('Email has not been sent', 'ERROR')
    })
  }

  getColumnsDefs() {
    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'chemical_id',
        checkboxSelection: true,
      },
      {
        headerName: 'Item',
        field: 'item',
      },
      {
        headerName: 'Recent CN',
        field: 'recent_cn',
      },
      {
        headerName: 'Purchase Unit',
        field: 'purchase_unit',
      },
      {
        headerName: 'CAS#',
        field: 'cas',
        editable: true
      },
      {
        headerName: 'Physical State',
        field: 'physical_state',
        editable: true
      },
      {
        headerName: 'Container Size',
        field: 'container_size',
        editable: true
      },
      {
        headerName: 'Health Hazard',
        field: 'health_hz',
        editable: true
      },
      {
        headerName: 'Fire Hazard',
        field: 'fire_hz',
        editable: true
      },
      {
        headerName: 'Reactivity Hazard',
        field: 'reactivity_hz',
        editable: true
      },
      {
        headerName: 'Specific hazard',
        field: 'specific_hz',
        editable: true
      },
      {
        headerName: 'Special notes',
        field: 'special_notes',
        editable: true
      }
    ]
  }

  getDefaultColDef() {
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      enableCellChangeFlash: true,
      floatingFilter: true,
    }
  }
}


