import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '~/services/client.service';
import { FormService } from '~/services/form.service';
import { FormInputComponent } from '../form-input/form-input.component';
import { ToolbarService } from '~/services/toolbar.service';

@Component({
  selector: 'form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})


export class FormGroupComponent implements OnInit, OnDestroy {
  @Input() formGroups: Array<{ title: string, docId: string, formLabels: Array<string>, form: FormGroup }> = [];
  @Input() formLabels: Array<string> = [];
  @Input() selectedIndex: number = 0;
  @Input() tab: string = '';
  @Input() section: string = '';
  @Input() subSection: string = '';
  @Input() clientId: string = '';
  @ViewChildren(FormInputComponent) formInputs?: QueryList<FormInputComponent>;

  constructor(public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService, public formService: FormService, public fb: FormBuilder, public clientService: ClientService) {
  }

  ngOnInit() {
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
          validators: {
            required: (form.formGroup as FormGroup).get(Object.keys(form.formGroup.value)[i])?.hasValidator(Validators.required) ? { state: true, message: 'This field is required' } : { state: false, message: '' }
          }
        })
      })
      const subSection = this.formInputs?.get(this.selectedIndex)?.formTitle!;
      const docId = this.formInputs?.get(this.selectedIndex)?.docId!;

      await this.formService.updateForm(this.clientId, this.tab, this.section, subSection, docId, submission);
      this.formService.formSubject.next({ type: 'form', tab: this.tab, section: this.section, subSection: subSection, docId: docId, data: form });
      this.selectedIndex = this.selectedIndex + 1;
    }
  }

  onReset() {

  }

  ngOnDestroy(): void {

  }
}
