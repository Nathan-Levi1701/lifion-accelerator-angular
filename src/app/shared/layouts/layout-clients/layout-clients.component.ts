import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'layout-clients',
  templateUrl: './layout-clients.component.html',
  styleUrls: ['./layout-clients.component.scss']
})
export class LayoutClientsComponent implements OnInit, OnDestroy {
  public title: string = '';

  constructor(public activatedRoute: ActivatedRoute) {
    activatedRoute.data.subscribe((data: Data) => {
      if (data['heading']) {
        this.title = data['heading'];
      }
    })
  }

  async ngOnInit(): Promise<void> {

  }

  ngOnDestroy(): void {

  }
}
