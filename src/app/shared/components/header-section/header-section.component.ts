import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss']
})
export class HeaderSectionComponent implements OnInit {
  public title: string = '';

  constructor(public activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      this.title = params['section'];
    })
  }

  ngOnInit(): void {

  }
}
