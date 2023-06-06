import { Component, Input, OnChanges, OnDestroy, OnInit, QueryList, AfterViewInit, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '~/services/client.service';
import { FormService } from '~/services/form.service';
import { FormInputComponent } from '../../forms/form-input/form-input.component';
import { ToolbarService } from '~/services/toolbar.service';
import { ExportService } from '~/services/export.service';
import { TitleCaseExtendedPipe } from '~/pipes/titlecase-extended.pipe';
@Component({
  selector: 'tab-form-group',
  templateUrl: './tab-form-group.component.html',
  styleUrls: ['./tab-form-group.component.scss']
})


export class TabFormGroupComponent implements OnInit, OnDestroy {
  @Input() formGroups: Array<{ title: string, docId: string, formLabels: Array<string>, form: FormGroup }> = [];
  @Input() formLabels: Array<string> = [];
  @Input() selectedIndex: number = 0;
  @Input() tab: string = '';
  @Input() section: string = '';
  @Input() subSection: string = '';
  @Input() clientId: string = '';
  @ViewChildren(FormInputComponent) formInputs?: QueryList<FormInputComponent>;
  @ViewChild(FormInputComponent, { static: false }) formInput!: FormInputComponent;

  constructor(public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService, public formService: FormService, public fb: FormBuilder, public clientService: ClientService, public exportService: ExportService, public titlecaseExtended: TitleCaseExtendedPipe) {
  }

  ngOnInit() {

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
          validators: {
            required: (form.formGroup as FormGroup).get(Object.keys(form.formGroup.value)[i])?.hasValidator(Validators.required) ? { state: true, message: 'This field is required' } : { state: false, message: '' }
          }
        })
      })
      const subSection = this.formInputs?.get(this.selectedIndex)?.formTitle!;
      const docId = this.formInputs?.get(this.selectedIndex)?.docId!;

      await this.formService.updateForm(this.clientId, this.tab, this.section, subSection, docId, submission);
      // this.formService.formSubject.next({ type: 'form', tab: this.tab, section: this.section, subSection: subSection, docId: docId, data: form });
      this.selectedIndex = this.selectedIndex + 1;
    }
  }

  onExport() {
    this.exportService.exportFormData({ tab: this.tab, section: this.titlecaseExtended.transform(this.section), subSection: this.titlecaseExtended.transform(this.formInput.formTitle), data: this.formInput });
  }

  onReset() {

  }

  ngOnDestroy(): void {

  }
}
