import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormService } from '~/services/form.service';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tab-review',
  templateUrl: './tab-review.component.html',
  styleUrls: ['./tab-review.component.scss']
})
export class TabReviewComponent implements OnInit {
  @Input() formGroups: Array<any> = [];
  @Input() clientId: string = '';
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

    let promises: Array<Promise<any>> = [];

    if (validations.every((v) => { return v })) {
      this.formInputs?.forEach(async (fg) => {
        let submission: Array<any> = [];
        fg.formLabels.forEach((l: string, i: number) => {
          submission.push({
            id: Object.keys(fg.formGroup.value)[i],
            label: l,
            value: Object.values(fg.formGroup.value)[i],
            validators: {
              required: (fg.formGroup as FormGroup).get(Object.keys(fg.formGroup.value)[i])?.hasValidator(Validators.required) ? { state: true, message: 'This field is required' } : { state: false, message: '' }
            }
          })
        })
        const subSection = fg.formTitle!;
        const docId = fg.docId!;

        promises.push(this.formService.updateForm(this.clientId, 'hr-structure', 'process-questions', subSection, docId, submission))
      })

      await Promise.all(promises);
    }
  }

  onReset() {

  }

}
