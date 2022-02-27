import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'inventory-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isProfileOpen: boolean = false
  @Output() signoutEvent = new EventEmitter<boolean>()
  
  constructor(
    public profileService: ProfileService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  handleLogout() {
    this.authService.logout()
    this.signoutEvent.emit(this.isProfileOpen)
  }

}
