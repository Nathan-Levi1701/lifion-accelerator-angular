import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '~/services/question.service';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})


export class FormInputComponent implements OnChanges, OnDestroy {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() formLabels: Array<string> = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }



  submit(formGroup: FormGroup) {
    console.log(formGroup.value)
  }

  ngOnDestroy(): void {

  }
}
