import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '~/services/form.service';

@Component({
  selector: 'header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss']
})
export class HeaderSectionComponent implements OnInit {
  public title: string = '';
  public documentId: string = '';

  constructor(public activatedRoute: ActivatedRoute, public formService: FormService) {
    this.activatedRoute.params.subscribe((params) => {
      this.title = params['section'];
    })
  }

  ngOnInit(): void {

  }
}
