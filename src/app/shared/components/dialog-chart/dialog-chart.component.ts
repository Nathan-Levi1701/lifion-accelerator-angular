import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dialog-chart',
  templateUrl: './dialog-chart.component.html',
  styleUrls: ['./dialog-chart.component.scss']
})
export class DialogChartComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({});

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<DialogChartComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formGroup = this.fb.group({
      id: [this.data.node.id],
      pid: [this.data.node.pid],
      code: ['', [Validators.required]],
      reportsToCode: [this.data.node.code],
      name: ['', [Validators.required]],
      parentStructure: [this.data.node.parentStructure],
      childStructure: [this.data.node.childStructure],
      relationship: ['partOf', [Validators.required]],
      role: ['', [Validators.required]],
      tags: [[]]
    })
  }

  ngOnInit(): void {
    this.formGroup.get('role')?.valueChanges.subscribe((value) => {
      this.formGroup.get('tags')?.setValue([value])
    })
  }

  public onSubmit(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.dialogRef.close(formGroup.value)
    }
  }
}
