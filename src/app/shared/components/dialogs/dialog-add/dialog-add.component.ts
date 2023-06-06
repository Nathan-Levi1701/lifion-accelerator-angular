import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TitleCaseExtendedPipe } from '~/pipes/titlecase-extended.pipe';
import { ChartService } from '~/services/chart.service';

@Component({
  selector: 'dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({});

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<DialogAddComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public chartService: ChartService, public titlecaseExtended: TitleCaseExtendedPipe) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {

  }


  public async onSubmit(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }
} 