import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ClientService } from '~/services/client.service';
import { ToolbarService } from '~/services/toolbar.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  public router: Router;
  public title: string = '';
  public tabs: Array<any> = [];

  constructor(public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService, public clientService: ClientService, router: Router) {
    this.router = router;

    toolbarService.tabsObservable.subscribe((tabs) => {
      this.tabs = tabs;
    })

    this.activatedRoute.params.subscribe(async (params) => {
      if (params['tab']) {
        this.title = params['tab'].replaceAll('-', ' ');
      }

      if (params['clientId']) {
        this.tabs.forEach((tab) => {
          tab.url = tab.url.replace('clientId', params['clientId'])
        })

        const response = await this.clientService.get(params['clientId']);
        this.clientService.clientSubject.next(response);
      }

      if (!params['clientId']) {
        this.tabs = []
      }
    })

    activatedRoute.data.subscribe((data: Data) => {
      if (data['title']) {
        this.title = data['title'];
      }
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    // this.toolbarService.toggleMenuSubject.unsubscribe();
  }

}
