import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from '~/services/client.service';
import { FormService } from '~/services/form.service';
import { QuestionService } from '~/services/question.service';
@Component({
  selector: 'form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})


export class FormClientComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup = new FormGroup({});
  public activatedRouteSubscription!: Subscription;

  constructor(public fb: FormBuilder, public clientService: ClientService, public formService: FormService, public questionService: QuestionService, public activatedRoute: ActivatedRoute, public router: Router) {
    this.formGroup = fb.group({
      id: [''],
      name: ['', [Validators.required]],
      createdAt: [''],
      updatedAt: [''],
    })
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(async (params) => {
      if (params['id']) {
        const response = await this.clientService.get(params['id']);
        if (response) {
          this.formGroup.setValue(response)
        }
      }
    })
  }

  async onSubmit(formGroup: FormGroup) {
    if (formGroup.valid) {
      if (formGroup.get('id')?.value) {
        const response = await this.clientService.update(formGroup.value);
        this.clientService.clientSubject.next(response)
        this.router.navigateByUrl('/view/clients');

      } else {
        const response = await this.clientService.create(formGroup.value);
        this.clientService.clientSubject.next(response);

        if (response) {
          this.router.navigateByUrl(`client/${response.id}/hr-structure/process-questions`);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription.unsubscribe();
  }
}
