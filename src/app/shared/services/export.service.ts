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
    sheet.addRow([]);
    data.data.formLabels.forEach((label: string, i: number) => {
      sheet.addRow([label, Object.values(data.data.formGroup.value)[i]])
    })

    workbook.xlsx.writeBuffer().then(excelData => {
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(blob, `${data.tab} ${data.section} ${data.subSection}.xlsx`);
    })
  }

  public exportAllFormData(data: any) {
    const workbook = new ExcelJS.Workbook();

    for (let i = 0; i < data.subSections.length; i++) {
      const sheet = workbook.addWorksheet(data.subSections[i]);
      sheet.addRow([data.section]);
      sheet.addRow([data.subSections[i]]);
      sheet.addRow([]);
      sheet.addRow(['Key Questions', 'Client Response']);
      sheet.addRow([]);
      data.formLabels[i].forEach((label: string, j: number) => {
        sheet.addRow([label, Object.values(data.data[i].value)[j]])
      })
    }

    workbook.xlsx.writeBuffer().then(excelData => {
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(blob, `${data.tab} ${data.section} ${data.subSection}.xlsx`);
    })
  }

  public exportAllChartData(data: any) {
    const workbook = new ExcelJS.Workbook();

    for (let i = 0; i < data.subSections.length; i++) {
      const sheet = workbook.addWorksheet(data.subSections[i]);

      sheet.addRow(['Unit Relationships']);
      sheet.addRow([]);
      sheet.addRow(['Code', 'Name', 'Structure', 'Role']);
      data.data[i].forEach((node: EnterpriseNode) => {
        sheet.addRow([node.code, node.name, node.childStructure, node.role]);
      })

      sheet.addRow([]);
      sheet.addRow([]);

      sheet.addRow(['Enterprise Units']);
      sheet.addRow([]);
      sheet.addRow(['Code', 'Reports To Code', 'Parent Structure', 'Child Structure', 'Relationship', 'Role']);
      data.data[i].forEach((node: EnterpriseNode) => {
        sheet.addRow([node.code, node.reportsToCode, node.parentStructure, node.childStructure, node.relationship, node.role]);
      });
    }

    workbook.xlsx.writeBuffer().then(excelData => {
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(blob, `${data.tab} ${data.section} ${data.subSection} - Organization Charts.xlsx`);
    })
  }

  public exportChartData(data: any) {
    let workbook = new ExcelJS.Workbook();
    let sheet = workbook.addWorksheet();

    sheet.addRow(['Code', 'Reports To Code', 'Parent Structure', 'Child Structure', 'Relationship', 'Role']);
    data.nodes.forEach((node: EnterpriseNode) => {
      sheet.addRow([node.code, node.reportsToCode, node.parentStructure, node.childStructure, node.relationship, node.role]);
    })

    workbook.xlsx.writeBuffer().then(excelData => {
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(blob, `${data.tab} ${data.section} ${data.subSection} - Enterprise Unit Relationship.xlsx`);
    })

    workbook = new ExcelJS.Workbook();
    sheet = workbook.addWorksheet();

    sheet.addRow(['Code', 'Name', 'Structure', 'Role']);
    data.nodes.forEach((node: EnterpriseNode) => {
      sheet.addRow([node.code, node.name, node.childStructure, node.role]);
    })

    workbook.xlsx.writeBuffer().then(excelData => {
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(blob, `${data.tab} ${data.section} ${data.subSection} - Enterprise Units.xlsx`);
    })
  }
}
