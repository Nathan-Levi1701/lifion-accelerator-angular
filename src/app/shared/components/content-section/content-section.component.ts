import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TitleCaseExtendedPipe } from '~/pipes/titlecase-extended.pipe';
import { ClientService } from '~/services/client.service';
import { FormService } from '~/services/form.service';
import { ToolbarService } from '~/services/toolbar.service';

@Component({
  selector: 'content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.scss']
})
export class ContentSectionComponent implements OnInit, OnDestroy {
  public formGroups: Array<{ title: string, docId: string, formLabels: Array<string>, form: FormGroup }> = [];
  public chartGroups: Array<{ title: string, docId: string, chartData: Array<any> }> = [];
  public formLabels: Array<string> = [];
  public tab: string = '';
  public section: string = '';
  public subSection: string = '';
  public clientId: string = '';

  constructor(public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService, public formService: FormService, public fb: FormBuilder, public clientService: ClientService, public titlecaseExtended: TitleCaseExtendedPipe) {
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (params) => {
      this.formGroups = [];
      this.chartGroups = [];
      this.formLabels = [];
      this.clientId = params['clientId'];
      this.tab = params['tab'];
      this.section = params['section'];

      [this.formGroups, this.chartGroups, this.formLabels] = await this.formService.getTabGroups(this.clientId, this.tab, this.section);

      setTimeout(() => {
        if (this.formGroups.length > 0) {
          const subSections = this.formGroups.map((fg) => { return this.titlecaseExtended.transform(fg.title) });
          const forms = this.formGroups.map((fg) => { return fg.form });
          const labels = this.formGroups.map((fg) => { return fg.formLabels });

          this.formService.formSubject.next({ type: 'form', tab: this.tab, section: this.titlecaseExtended.transform(this.section), subSections: subSections, formLabels: labels, data: forms });
        }

        if (this.chartGroups.length > 0) {
          const subSections = this.chartGroups.map((cg) => { return this.titlecaseExtended.transform(cg.title) });
          const charts = this.chartGroups.map((cg) => { return cg.chartData });

          this.formService.formSubject.next({ type: 'chart', tab: this.tab, section: this.titlecaseExtended.transform(this.section), subSections: subSections, data: charts });
        }

      }, 1000);
    });
  }

  ngOnDestroy(): void {

  }

}
