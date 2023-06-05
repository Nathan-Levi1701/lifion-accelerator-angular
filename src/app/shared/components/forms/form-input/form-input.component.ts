import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})

export class FormInputComponent implements OnInit, OnDestroy {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() formLabels: Array<string> = [];
  @Input() formTitle: string = '';
  @Input() docId: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
