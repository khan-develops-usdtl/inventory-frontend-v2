import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IInventory } from 'src/inventory/inventory.state';
import { clearSearch, setSearch } from '../../store/search/search.actions';

@Component({
  selector: 'inventory-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  text: string
  constructor(
    private _store: Store<IInventory>
  ) { }

  ngOnInit(): void {
    this._store.select('search').subscribe(res => this.text = res)
  }

  handleSearch($event: string) {
    this._store.dispatch(setSearch({ text: $event }))
  }

  handleClear() {
    this._store.dispatch(clearSearch())
  }
}
