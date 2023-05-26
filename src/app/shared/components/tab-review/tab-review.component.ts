import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormService } from '~/services/form.service';
import { FormGroup, Validators } from '@angular/forms';
import { FormInputComponent } from '../forms/form-input/form-input.component';

@Component({
  selector: 'tab-review',
  templateUrl: './tab-review.component.html',
  styleUrls: ['./tab-review.component.scss']
})
export class TabReviewComponent implements OnInit {
  @Input() formGroups: Array<any> = [];
  @Input() clientId: string = '';
  @Input() tab: string = '';
  @Input() section: string = '';
  @Output() onPreviousTab = new EventEmitter<boolean>(false);
  @ViewChildren(FormInputComponent) formInputs?: QueryList<FormInputComponent>;

  constructor(public formService: FormService) {

  }

  ngOnInit(): void {

  }

  public onBack() {
    this.onPreviousTab.emit(true)
  }

  async onSubmit() {
    const validations: Array<boolean> = [];
    this.formInputs?.forEach((fg) => {
      fg.formGroup.markAllAsTouched();
      validations.push(fg.formGroup.valid);
    });

    let subSections: Array<string> = [];
    let documentIds: Array<string> = [];

    if (validations.every((v) => { return v })) {
      let formGroupsMap = new Map()

      this.formInputs?.forEach(async (fg) => {
        let submissions: Array<any> = [];
        fg.formLabels.forEach((l: string, i: number) => {
          submissions.push({
            id: Object.keys(fg.formGroup.value)[i],
            section: fg.formTitle,
            label: l,
            value: Object.values(fg.formGroup.value)[i],
            validators: {
              required: (fg.formGroup as FormGroup).get(Object.keys(fg.formGroup.value)[i])?.hasValidator(Validators.required) ? { state: true, message: 'This field is required' } : { state: false, message: '' }
            }
          })
        })

        formGroupsMap.set(fg.formTitle, submissions);

        subSections.push(fg.formTitle!);
        documentIds.push(fg.docId);
      });

      await this.formService.updateForms(this.clientId, this.tab, this.section, Array.from(formGroupsMap.keys()), documentIds, Array.from(formGroupsMap.values()));
    }
  }

  onReset() {

  }

}
