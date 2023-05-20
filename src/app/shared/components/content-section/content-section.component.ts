import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.scss']
})
export class ContentSectionComponent implements OnInit {
  public section: string = '';

  constructor(public activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      this.section = params['section'];
    })
  }

  ngOnInit(): void {

  }

}
