import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom, map } from 'rxjs';
import { DialogChartComponent } from '~/components/dialog-chart/dialog-chart.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog) {
  }

  public openDialogChart(data?: any) {
    const response = lastValueFrom(this.dialog.open(DialogChartComponent, { data: data }).afterClosed());
    return response;
  }
}
