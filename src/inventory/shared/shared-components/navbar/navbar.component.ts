import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/inventory/auth/auth.service';
import { IInventory } from 'src/inventory/inventory.state';


@Component({
  selector: 'inventory-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loading$ = this._store.select('loading')
  isLoggedIn: boolean
  isUserVisible: boolean;
  isMenuVisible: boolean;
  
  constructor(
    private _router: Router,
    public authService: AuthService,
    private _store: Store<IInventory>,
  ) { }

  ngOnInit(): void {
  }
}