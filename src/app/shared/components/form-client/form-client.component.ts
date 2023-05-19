import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '~/services/client.service';

@Component({
  selector: 'form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})


export class FormClientComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup = new FormGroup({});

  constructor(public fb: FormBuilder, public clientService: ClientService, public activatedRoute: ActivatedRoute, public router: Router) {
    this.formGroup = fb.group({
      id: [''],
      name: ['', [Validators.required]],
      createdAt: [''],
      updatedAt: [''],
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      if (params['id']) {
        const response = await this.clientService.get(params['id']);
        if (response) {
          this.formGroup.setValue(response)
        }
      }
    })
  }

  async onSubmit(formGroup: FormGroup) {
    console.log(formGroup.value)
    if (formGroup.valid) {
      if (formGroup.get('id')?.value) {
        await this.clientService.update(formGroup.value);
        this.router.navigateByUrl('/view/clients');

      } else {
        await this.clientService.create(formGroup.value);
        this.router.navigateByUrl('/view/clients');
      }
    }
  }

  ngOnDestroy(): void {

  }
}
