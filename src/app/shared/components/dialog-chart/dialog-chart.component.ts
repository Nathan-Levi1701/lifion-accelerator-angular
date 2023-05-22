import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnterpriseNode } from '~/interfaces/Enterprise.interface';
import { ExistsInArrayValidator } from '~/validators/exists-in-array.validator';
@Component({
  selector: 'dialog-chart',
  templateUrl: './dialog-chart.component.html',
  styleUrls: ['./dialog-chart.component.scss']
})
export class DialogChartComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({});

  public filteredRoles = this.data.nodes.filter((node: EnterpriseNode) => { return node.id !== this.data.node.id }).map((n: any) => { return n.code })

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<DialogChartComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formGroup = this.fb.group({
      id: [this.data.node.id],
      pid: [this.data.node.pid],
      code: [this.data.node.code, [Validators.required]],
      reportsToCode: [this.data.node.reportsToCode],
      name: [this.data.node.name, [Validators.required]],
      parentStructure: [this.data.node.parentStructure],
      childStructure: [this.data.node.childStructure],
      relationship: ['partOf', [Validators.required]],
      role: [this.data.node.role, [Validators.required]],
      tags: [this.data.node.tags],
    }, { validators: [ExistsInArrayValidator('code', this.filteredRoles)] })
  }

  ngOnInit(): void {
    this.formGroup.get('role')?.valueChanges.subscribe((value) => {
      this.formGroup.get('tags')?.setValue([value])
    })
  }

  private incrementCode() {
    const roleControl = this.formGroup.get('role');

    if (this.formGroup.get('code')?.value.trim().length === 0) {
      if (!this.formGroup.get('tags')?.value.includes('root')) {
        const wordCount = roleControl?.value.split(' ').length;
        const totalRoleCount = this.data.nodes.filter((node: EnterpriseNode) => { return node.pid === this.formGroup.get('pid')?.value && node.role === roleControl?.value && node.id !== this.formGroup.get('id')?.value }).length + 1;

        if (wordCount === 1) {
          const code = `${roleControl?.value.substring(0, 3).toUpperCase()}-${totalRoleCount < 10 ? String(totalRoleCount).padStart(2, '0') : totalRoleCount}`
          this.formGroup.get('code')?.setValue(code);
        } else {
          const code = `${roleControl?.value.role.split(" ").map((word: string) => word.charAt(0)).join("").toUpperCase()}-${totalRoleCount < 10 ? String(totalRoleCount).padStart(2, '0') : totalRoleCount}`;
          this.formGroup.get('code')?.setValue(code);
        }
      }
    }
  }

  public onSubmit(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.incrementCode();
      this.dialogRef.close(formGroup.value)
    }
  }
}