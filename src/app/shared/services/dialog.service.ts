import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { DialogAddComponent } from '~/components/dialogs/dialog-add/dialog-add.component';
import { DialogChartComponent } from '~/components/dialogs/dialog-chart/dialog-chart.component';
import { DialogConfirmComponent } from '~/components/dialogs/dialog-confirm/dialog-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog) {
  }

  public openDialogChart(data?: any) {
    const response = lastValueFrom(this.dialog.open(DialogChartComponent, { data: data, disableClose: true }).afterClosed());
    return response;
  }

  public openDialogConfirm(data?: any) {
    const response = lastValueFrom(this.dialog.open(DialogConfirmComponent, { data: data, disableClose: true }).afterClosed());
    return response;
  }

  public openDialogAdd(data?: any) {
    const response = lastValueFrom(this.dialog.open(DialogAddComponent, { data: data, disableClose: true }).afterClosed());
    return response;
  }
}
