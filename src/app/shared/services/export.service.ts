import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import { EnterpriseNode } from '~/interfaces/Enterprise.interface';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  constructor() {
  }

  private saveWorkbook(workbook: ExcelJS.Workbook, data: any) {
    workbook.xlsx.writeBuffer().then(excelData => {
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(blob, `${data.tab} ${data.section} ${data.subSection}.xlsx`);
    })
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

  public exportChartData(data: any) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet();

    sheet.addRow(['Code', 'Reports To Code', 'Parent Structure', 'Child Structure', 'Relationship', 'Role']);
    data.data.forEach((node: EnterpriseNode) => {
      sheet.addRow([node.code, node.reportsToCode, node.reportsToCode, node.childStructure, node.relationship, node.role]);
    })

    this.saveWorkbook(workbook, data);

    sheet.addRow(['Code', 'Name', 'Structure', 'Role']);
    data.data.forEach((node: EnterpriseNode) => {
      sheet.addRow([node.code, node.name, node.childStructure, node.role]);
    })

    this.saveWorkbook(workbook, data);
  }
}
