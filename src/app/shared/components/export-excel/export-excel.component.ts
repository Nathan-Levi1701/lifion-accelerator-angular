import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExportService } from '~/services/export.service';
import { FormService } from '~/services/form.service';

@Component({
  selector: 'export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.scss']
})
export class ExportExcelComponent implements OnInit {
  public exportObject: any = {};

  constructor(public activatedRoute: ActivatedRoute, public exportService: ExportService, public formService: FormService) {
  }

  ngOnInit(): void {
    this.formService.formObservable.subscribe((response) => {
      this.exportObject = response;
    });
  }

  public export() {
    switch (this.exportObject.type) {
      case 'form': {
        this.exportService.exportAllFormData(this.exportObject);
        break;
      }
      case 'chart': {
        this.exportService.exportAllChartData(this.exportObject);
        break;
      }
      default: {
        break;
      }
    }
  }
}
