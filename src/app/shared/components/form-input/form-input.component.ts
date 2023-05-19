import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '~/services/form.service';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})


export class FormInputComponent implements OnInit, OnDestroy {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() formLabels: Array<string> = [];
  @Input() submit: any = {};

  @Input() section: string = '';
  @Input() subSection: string = '';

  constructor(public formService: FormService) {
  }

  ngOnInit(): void {
    this.formService.formSubmitObservable.subscribe(async (state: boolean) => {
      if (state) {
        this.formGroup.markAllAsTouched()
      }
    })

    this.formService.formResetObservable.subscribe((state: boolean) => {
      if (state) {
        this.formGroup.reset()
        this.formService.formSubmitSubject.next(false)
      }
    })
  }

  onSubmit(formGroup: FormGroup) {

  }

  ngOnDestroy(): void {
    // this.formService.formResetSubject.unsubscribe();
    // this.formService.formSubmitSubject.unsubscribe();
  }
}
