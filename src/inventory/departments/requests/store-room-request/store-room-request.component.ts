import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'inventory-store-room-request',
  templateUrl: './store-room-request.component.html',
  styleUrls: ['./store-room-request.component.scss']
})
export class StoreRoomRequestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

}
