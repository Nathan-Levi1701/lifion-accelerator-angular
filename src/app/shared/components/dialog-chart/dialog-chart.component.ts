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

  public roles: Array<{ value: string, text: string }> = [];

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<DialogChartComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formGroup = this.fb.group({
      id: [this.data.node.id],
      pid: [this.data.node.pid],
      code: [this.data.node.code, [Validators.required]],
      reportsToCode: [this.data.node.code],
      name: [this.data.node.name, [Validators.required]],
      parentStructure: [this.data.node.parentStructure],
      childStructure: [this.data.node.childStructure],
      relationship: ['partOf', [Validators.required]],
      role: [this.data.node.role, [Validators.required]],
      tags: [this.data.node.tags]
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
