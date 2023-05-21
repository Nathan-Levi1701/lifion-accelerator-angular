import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  constructor() {
  }

  public exportFormData(data: any) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet();
    sheet.addRow([data.section]);
    sheet.addRow([data.subSection]);
    sheet.addRow([]);
    sheet.addRow(['Key Questions', 'Client Response']);
    data.data.formLabels.forEach((label: string, i: number) => {
      sheet.addRow([label, Object.values(data.data.formGroup.value)[i]])
    })

    workbook.xlsx.writeBuffer().then(excelData => {
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(blob, `${data.tab} ${data.section} ${data.subSection}.xlsx`);
    })
  }
}
