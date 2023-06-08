import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '~/services/auth.service';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})

export class FormLoginComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup = new FormGroup({});
  public toggleVisibility: boolean = false;

  constructor(private fb: FormBuilder, public authService: AuthService) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  async onSubmit(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.authService.login(formGroup.value)
    }
  }

  ngOnDestroy(): void {
  }
}
