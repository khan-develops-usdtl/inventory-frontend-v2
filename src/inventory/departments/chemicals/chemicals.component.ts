import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { IInventory } from 'src/inventory/inventory.state';
import { ChemicalsService } from './chemicals.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IDepartment } from '../departments-models/departments.model';
import { SnackbarService } from 'src/inventory/shared/shared-components/snackbar/snackbar.service';
import { BottomToolbarService } from 'src/inventory/shared/shared-components/navbar/bottom-toolbar/bottom-toolbar.service';
import { ChemicalsCategoryRendererComponent } from './chemicals-category-renderer/chemicals-category-renderer.component';
import { ChemicalsQuantityRendererComponent } from './chemicals-quantity-renderer/chemicals-quantity-renderer.component';
import { map } from 'rxjs/operators';


@Component({
  selector: 'inventory-chemicals',
  templateUrl: './chemicals.component.html',
  styleUrls: ['./chemicals.component.scss']
})
export class ChemicalsComponent implements OnInit {
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
    this.frameworkComponents = {
      quantityRenderer: ChemicalsQuantityRendererComponent,
      categoryRenderer: ChemicalsCategoryRendererComponent,
    }
    this.context = { chemicalsComponent: this }
  }

  ngOnInit(): void {
    this.getMasterChiemicalItems()
    this.getColumnsDefs()
    this.getDefaultColDef()
  }

  getMasterChiemicalItems() {
    this.rowData = this._chemicalsService.getMasterChemicalItems().pipe(map(items => {
      return items.filter(masterItem => masterItem.chemicals).sort((a,b) => a.chemicals.id - b.chemicals.id)
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
        health_hz: $event.data.health_hz === '' || $event.data.container_size === undefined ? null : $event.data.container_size,
        fire_hz: $event.data.fire_hz === '' || $event.data.fire_hz === undefined ? null : $event.data.fire_hz,
        specific_hz: $event.data.specific_hz === '' || $event.data.specific_hz === undefined ? null : $event.data.specific_hz,
        special_notes: $event.data.special_notes === '' || $event.data.special_notes === undefined ? null : $event.data.special_notes,
        reactivity_hz: $event.data.reactivity_hz === '' || $event.data.reactivity_hz === undefined ? null : $event.data.reactivity_hz
      }
      this._chemicalsService.updateChemicalItem($event.data.chemicals.id, data).subscribe({
        next: data => {
          if($event.newValue !== $event.oldValue) {
            this.getMasterChiemicalItems()
          } 
        },
        error: () => {
          this._snackbarService.openSnackbar('Item could not be updated', 'ERROR')
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
        headerName: 'Location',
        field: 'location'
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
      },
      {
        headerName: 'CAS#',
        field: 'cas',
      },
      {
        headerName: 'Physical State',
        field: 'physical_state',
      },
      {
        headerName: 'Container Size',
        field: 'container_size',
      },
      {
        headerName: 'Health Hazard',
        field: 'health_hz',
        headerClass: function(params: any) {
          return 'health_hz'
        },
        cellStyle:  function() {
          return { 'background-color': '#1852ffa6', 'font-weight': 'bold', 'text-align': 'center' }
        }
      },
      {
        headerName: 'Fire Hazard',
        field: 'fire_hz',
        headerClass: function(params: any) {
          return 'fire_hz'
        },
        cellStyle:  function() {
          return { 'background-color': '#ff2e2eb7', 'font-weight': 'bold', 'text-align': 'center' }
        }
      },
      {
        headerName: 'Reactivity Hazard',
        field: 'reactivity_hz',
        headerClass: function(params: any) {
          return 'reactivity_hz'
        },
        cellStyle:  function() {
          return { 'background-color': '#ffff00c9', 'font-weight': 'bold', 'text-align': 'center' }
        }
      },
      {
        headerName: 'Specific hazard',
        field: 'specific_hz',
      },
      {
        headerName: 'Special notes',
        field: 'special_notes',
      }
    ]
  }

  getDefaultColDef() {
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      enableCellChangeFlash: true,
    }
  }
}

