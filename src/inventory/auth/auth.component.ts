import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  title = {
    'font-size': '3em',
    'margin-bottom': '1em',
  }
  subtitle = {
    'font-size': '1.75em'
  }
  copyright = {
    'font-size': '0.5em'
  }

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void { }

}
