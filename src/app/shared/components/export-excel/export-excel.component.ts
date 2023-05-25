import { Component, OnInit } from '@angular/core';
import { ExportService } from '~/services/export.service';
import { FormService } from '~/services/form.service';

@Component({
  selector: 'export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.scss']
})
export class ExportExcelComponent implements OnInit {
  public exportObject: any = {};

  constructor(public exportService: ExportService, public formService: FormService) {
  }

  ngOnInit(): void {
    this.formService.formObservable.subscribe((response) => {
      this.exportObject = response;
    });
  }

  public export() {
    switch (this.exportObject.type) {
      case 'form': {
        this.exportService.exportFormData(this.exportObject);
        break;
      }
      case 'chart': {
        this.exportService.exportChartData(this.exportObject);
        break;
      }
      default: {
        break;
      }
    }
  }
}
