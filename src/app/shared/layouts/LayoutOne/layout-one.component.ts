import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'layout-one',
  templateUrl: './layout-one.component.html',
  styleUrls: ['./layout-one.component.scss']
})
export class LayoutOneComponent implements OnInit {
  public title: string = '';
  private activatedRoute: ActivatedRoute;

  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute
  }

  ngOnInit(): void {
    this.activatedRoute.title.subscribe((title: any) => {
      this.title = title;
    })
  }
}
