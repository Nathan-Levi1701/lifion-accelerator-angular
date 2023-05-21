import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {
  constructor(public snackBar: MatSnackBar) {
  }

  public showFeedback(message: string, panelClass: 'success' | 'error') {
    this.snackBar.open(message, 'Close', { duration: panelClass == 'success' ? 3000 : undefined, panelClass: ['custom', panelClass] })
  }
}
