import { Component } from '@angular/core';
import { AgFrameworkComponent, } from 'ag-grid-angular';
import { IFloatingFilter, IFloatingFilterParams, NumberFilter, TextFilterModel } from 'ag-grid-community';
import { StoreRoomService } from '../store-room.service';


export interface FloatingFilterComponentParams extends IFloatingFilterParams {
  value: string;
}

@Component({
  selector: 'inventory-store-room-category-filter',
  templateUrl: './store-room-category-filter.component.html',
  styleUrls: ['./store-room-category-filter.component.scss']
})
export class StoreRoomCategoryFilterComponent implements  IFloatingFilter, AgFrameworkComponent<FloatingFilterComponentParams> {
  categories: string[] = ['all']
  selected: string
  params: FloatingFilterComponentParams;

  constructor(
    private _storeRoomService: StoreRoomService,
  ) { }

  agInit(params: any): void {
    this._storeRoomService.getStoreRoomItems().subscribe(storeRoomItemsRes => {
      storeRoomItemsRes.map(storeRoomItem => {
        if(storeRoomItem.master.category && this.categories.indexOf(storeRoomItem.master.category) < 0 ) {
          this.categories.push(storeRoomItem.master.category)
        }
      })
    }
    )
    this.params = params;
    this.selected = 'all'
  }

  valueChanged() {
    let valueToUse = this.selected === 'all' ? null : this.selected
    this.params.parentFilterInstance(function (instance) {
      (<NumberFilter>instance).onFloatingFilterChanged(
        'greaterThan',
        valueToUse
      );
    });
  }

  onParentModelChanged(parentModel: TextFilterModel): void {
    if (!parentModel) {
      this.selected = 'all';
    } else {
      this.selected = parentModel.filter;
    }
  }
}


