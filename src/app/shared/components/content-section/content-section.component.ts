import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService, public formService: FormService, public fb: FormBuilder, public clientService: ClientService) {
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (params) => {
      this.formGroups = [];
      this.chartGroups = [];
      this.formLabels = [];
      this.clientId = params['clientId'];
      this.tab = params['tab'];
      this.section = params['section'];

      const subSections = await this.formService.getSections(this.clientId, this.tab, this.section);
      if (subSections && subSections['sections']) {
        subSections['sections'].forEach(async (subSection: string) => {
          const response = await this.formService.getForms(this.clientId, this.tab, this.section, subSection);

          if (this.section === 'enterprise-structure') {
            this.formGroups = [];
            this.chartGroups.push({ title: response[0].subSection, docId: response[0].id, chartData: response[0].data });
          } else {
            this.buildForms(response);
          }
        });
      }
    });
  }

  private buildForms(formData: Array<any>) {
    formData.forEach((form) => {
      this.subSection = form.subSection;

      const formGroup = new FormGroup({});
      this.formLabels = [];
      form.data.forEach((f: any) => {
        this.formLabels.push(f.label);
        formGroup.addControl(f.id, new FormControl(f.value, f.validators ? f.validators.required?.state ? [Validators.required] : [] : []));
      });

      formGroup.updateValueAndValidity()
      this.formGroups.push({ title: this.subSection, docId: form.id, formLabels: this.formLabels, form: formGroup });
    })
  }

  ngOnDestroy(): void {

  }

}
