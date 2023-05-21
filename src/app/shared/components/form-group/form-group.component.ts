import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '~/services/client.service';
import { FormService } from '~/services/form.service';
import { FormInputComponent } from '../form-input/form-input.component';
import { ToolbarService } from '~/services/toolbar.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})


export class FormGroupComponent implements OnInit, OnDestroy, AfterViewInit {
  public formGroups: Array<{ title: string, docId: string, formLabels: Array<string>, form: FormGroup }> = [];
  public formLabels: Array<string> = [];
  public selectedIndex: number = 0;
  public tab: string = '';
  public section: string = '';
  public subSection: string = '';
  public clientId: string = '';
  @ViewChildren(FormInputComponent) formInputs?: QueryList<FormInputComponent>;

  constructor(public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService, public formService: FormService, public fb: FormBuilder, public clientService: ClientService) {
  }

  ngAfterViewInit(): void {

  }

  public selectedTabChanged(tabChangeEvent: MatTabChangeEvent) {

  }


  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (params) => {
      this.formGroups = [];
      this.formLabels = [];
      this.clientId = params['clientId'];
      this.tab = params['tab'];
      this.section = params['section'];

      if (this.section !== 'enterprise-structure') {
        const subSections = await this.formService.getSections(this.clientId, this.tab, this.section);
        if (subSections && subSections['sections']) {
          subSections['sections'].forEach(async (subSection: string) => {
            const response = await this.formService.getForms(this.clientId, this.tab, this.section, subSection);
            this.buildForms(response);
          });
        }
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

  public onBack() {
    this.selectedIndex = --this.selectedIndex;
  }

  async onSubmit() {
    const form: any = this.formInputs?.get(this.selectedIndex);
    form.formGroup.markAllAsTouched();

    if (form.formGroup.valid) {
      let submission: Array<any> = [];
      form.formLabels.forEach((l: string, i: number) => {
        submission.push({
          id: Object.keys(form.formGroup.value)[i],
          label: l,
          value: Object.values(form.formGroup.value)[i],
          validators: {}
        })
      })
      const subSection = this.formInputs?.get(this.selectedIndex)?.formTitle!;
      const docId = this.formInputs?.get(this.selectedIndex)?.docId!;

      await this.formService.updateForm(this.clientId, this.tab, this.section, subSection, docId, submission);
      this.formService.formSubject.next({ tab: this.tab, section: this.section, subSection: subSection, docId: docId, data: form });
      this.selectedIndex = this.selectedIndex + 1;
    }
  }

  onReset() {

  }

  ngOnDestroy(): void {

  }
}
