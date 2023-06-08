import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormService } from '~/services/form.service';

@Component({
  selector: 'header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss']
})
export class HeaderSectionComponent implements OnInit, OnDestroy {
  public title: string = '';
  public documentId: string = '';
  public activatedRouteSubscription!: Subscription;

  constructor(public activatedRoute: ActivatedRoute, public formService: FormService) {

  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params) => {
      this.title = params['section'];
    })
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription.unsubscribe();
  }
}
