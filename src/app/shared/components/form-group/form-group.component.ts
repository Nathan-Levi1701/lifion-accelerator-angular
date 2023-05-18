import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  public formHeadings: Array<string> = []

  constructor(activatedRoute: ActivatedRoute, public questionService: QuestionService, public fb: FormBuilder) {
    this.activatedRoute = activatedRoute;
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (params) => {
      const response = await this.questionService.getQuestions(params['id'], params['section'])
      response.forEach((form) => {
        this.formHeadings.push(form.id.replaceAll('-', ' '))
        const group = new FormGroup({})
        this.x = []
        form.data.forEach((f: any) => {
          this.x.push(f.label);
          group.addControl(f.id, new FormControl())
        })
        this.formLabels.push(this.x)
        this.formGroups.push(group)
      })
    })
  }

  submit(formGroup: FormGroup) {
    console.log(formGroup.value)
  }

  ngOnDestroy(): void {

  }
}
