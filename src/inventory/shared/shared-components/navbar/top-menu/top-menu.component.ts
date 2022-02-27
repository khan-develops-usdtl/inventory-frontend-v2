import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/inventory/auth/auth.service';
import { IInventory } from 'src/inventory/inventory.state';

@Component({
  selector: 'inventory-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  @Output() navigationEvent = new EventEmitter<boolean>(false)
  isAdmin: boolean;
  isExtraction: boolean;
  isMassSpec: boolean;
  isReceiving: boolean;
  isRd: boolean;

  requestGroupsByDepartments: string[] = [
    "inventory_extractions",
    "inventory_mass-spec",
    "inventory_receiving",
    "inventory_rd",
    "inventory_screening",
    "inventory_quality",
    "inventory_chemicals",
    "inventory_finance",
    "inventory_data-review",
    "inventory_safety",
    "inventory_laboratory",
    "inventory_shipping",
    "inventory_marketing",
    "inventory_it",
    "inventory_accounting"
  ]

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    
  }

  handleNavigation() {
    this.navigationEvent.emit(true)
  }

  isInRequestsGroup() {
    return this.requestGroupsByDepartments.some(groupName => groupName === this.authService.currentUser().group)
  }
}
