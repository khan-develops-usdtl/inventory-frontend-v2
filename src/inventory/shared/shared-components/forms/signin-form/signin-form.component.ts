import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/inventory/auth/auth.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SignInFormComponent implements OnInit {
  hide = true;
  error$: Observable<string>
  flexContainer = {
    'width': '40em'
  }
  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _authService: AuthService,
  ) { }
  signinForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  onSubmit() {
    this._authService.signIn(this.signinForm.value)
  }
  ngOnInit(): void {
    this.error$ = this._authService.currentErrorMessage
    this._breakpointObserver.observe(Breakpoints.XSmall).subscribe(result => {
      if (result.matches) {
        this.flexContainer = {
          'width': '20em'
        }
      }
    });
    this._breakpointObserver.observe(Breakpoints.Small).subscribe(result => {
      if (result.matches) {
        this.flexContainer = {
          'width': '30em'
        }
      }
    });
    this._breakpointObserver.observe(Breakpoints.Medium).subscribe(result => {
      if (result.matches) {
        this.flexContainer = {
          'width': '40em'
        }
      }
    });
    this._breakpointObserver.observe(Breakpoints.Large).subscribe(result => {
      if (result.matches) {
        this.flexContainer = {
          'width': '40em'
        }
      }
    });
    this._breakpointObserver.observe(Breakpoints.XLarge).subscribe(result => {
      if (result.matches) {
        this.flexContainer = {
          'width': '40em'
        }
      }
    });
  }
}
