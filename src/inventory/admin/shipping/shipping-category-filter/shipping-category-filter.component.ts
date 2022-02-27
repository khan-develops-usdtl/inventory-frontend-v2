import { Component } from '@angular/core';
import { AgFrameworkComponent, } from 'ag-grid-angular';
import { IFloatingFilter, IFloatingFilterParams, NumberFilter, TextFilterModel } from 'ag-grid-community';
import { ShippingService } from '../shipping.service';


export interface FloatingFilterComponentParams extends IFloatingFilterParams {
  value: string;
}

@Component({
  selector: 'inventory-shipping-category-filter',
  templateUrl: './shipping-category-filter.component.html',
  styleUrls: ['./shipping-category-filter.component.scss']
})
export class ShippingCategoryFilterComponent implements  IFloatingFilter, AgFrameworkComponent<FloatingFilterComponentParams> {
  categories: string[] = ['all']
  selected: string
  params: FloatingFilterComponentParams;

  constructor(
    private _shippingService: ShippingService,
  ) { }

  agInit(params: any): void {
    this._shippingService.getShippingItems().subscribe(shippingItems => {
      shippingItems.map(shippingItem => {
        if(shippingItem.master.category && this.categories.indexOf(shippingItem.master.category) < 0 ) {
          this.categories.push(shippingItem.master.category)
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

