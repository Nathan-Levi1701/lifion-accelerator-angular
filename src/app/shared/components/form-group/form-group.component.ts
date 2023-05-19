import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '~/services/client.service';
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
  public tab: string = '';
  public section: string = '';
  public subSection: string = '';
  public clientId: string = '';
  @ViewChild('tabGroup', { static: false }) tabGroup: MatTabGroup = {} as any;

  constructor(activatedRoute: ActivatedRoute, public questionService: QuestionService, public formService: FormService, public fb: FormBuilder, public clientService: ClientService) {
    this.activatedRoute = activatedRoute;
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (params) => {
      this.formHeadings = [];
      this.formGroups = [];
      this.x = [];
      this.clientId = params['clientId'];

      const response = await this.questionService.getQuestions(params['tab'], params['section'])
      response.forEach((form) => {
        this.tab = params['tab'];
        this.section = params['section'];
        this.subSection = form.id;

        this.formHeadings.push(form.id)
        const formGroup = new FormGroup({})
        this.x = []
        form.data.forEach((f: any) => {
          this.x.push(f.label);
          formGroup.addControl(f.id, new FormControl('', f.validators?.required.state ? [Validators.required] : []))
        })
        formGroup.updateValueAndValidity()
        this.formLabels.push(this.x)
        this.formGroups.push(formGroup)
      })
    })
  }

  async onSubmit(formGroup: FormGroup) {
    this.subSection = this.formHeadings[this.selectedIndex]
    this.formService.formSubmitSubject.next(true);

    if (formGroup.valid) {
      await this.formService.addForm(this.clientId, this.tab, this.section, this.subSection, formGroup.value)
      this.selectedIndex = this.selectedIndex + 1;
    }

    this.formService.formSubmitSubject.next(false)
  }

  onReset() {
    this.formService.formResetSubject.next(true)
  }

  ngOnDestroy(): void {
    // this.formService.formResetSubject.unsubscribe();
    // this.formService.formSubmitSubject.unsubscribe();
  }
}
