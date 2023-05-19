import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '~/services/form.service';
import { QuestionService } from '~/services/question.service';

@Component({
  selector: 'form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})


export class FormGroupComponent implements OnInit, OnDestroy {
  private activatedRoute: ActivatedRoute;
  public formGroups: Array<FormGroup> = [];
  public formLabels: Array<any> = [];
  public x: Array<string> = [];
  public formHeadings: Array<string> = [];
  public formGroup: FormGroup = new FormGroup({});
  public selectedIndex: number = 0;
  @ViewChild('tabGroup', { static: false }) tab: MatTabGroup | undefined;

  constructor(activatedRoute: ActivatedRoute, public questionService: QuestionService, public formService: FormService, public fb: FormBuilder) {
    this.activatedRoute = activatedRoute;
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (params) => {
      this.formHeadings = [];
      this.formGroups = [];
      this.x = [];

      const response = await this.questionService.getQuestions(params['id'], params['section'])
      response.forEach((form) => {
        this.formHeadings.push(form.id.replaceAll('-', ' '))
        const formGroup = new FormGroup({})
        this.x = []
        form.data.forEach((f: any, i: number) => {
          this.x.push(f.label);
          formGroup.addControl(f.id, new FormControl('', f.validators?.required.state ? [Validators.required] : []))
        })
        formGroup.updateValueAndValidity()
        this.formLabels.push(this.x)
        this.formGroups.push(formGroup)
      })
    })
  }

  onSubmit(formGroup: FormGroup) {
    this.formService.formSubmitSubject.next(true);

    if (formGroup.valid) {
      this.selectedIndex = this.selectedIndex + 1
      this.formService.formSubmitSubject.next(false)
    }
  }

  onReset() {
    this.formService.formResetSubject.next(true)
  }

  ngOnDestroy(): void {
    this.formService.formResetSubject.unsubscribe();
    this.formService.formSubmitSubject.unsubscribe();
  }
}
