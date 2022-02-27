import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackbar: MatSnackBar
  ) { }

  openSnackbar(message: string, action: "SUCCESS" | "ERROR") {
    this._snackbar.open(
      message,
      action,  
      { duration: 6000, 
        horizontalPosition: 'center', 
        verticalPosition: 'bottom', 
        panelClass: action,
        data: {
          message: message,
          type: action
        }
      }
    )
  }
}
