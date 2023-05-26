import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import Client from '~/interfaces/Client.interface';
import { ClientService } from '~/services/client.service';
import { ToolbarService } from '~/services/toolbar.service';

@Component({
  selector: 'navbar-section',
  templateUrl: './navbar-section.component.html',
  styleUrls: ['./navbar-section.component.scss']
})
export class NavBarSectionComponent implements OnInit, OnDestroy {
  public title: string = '';
  public tabs: Array<any> = [];
  public client: Client = {} as any;

  constructor(public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService, public clientService: ClientService, public router: Router) {
    toolbarService.tabsObservable.subscribe((tabs) => {
      this.tabs = tabs;
    });

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((e: any) => {
      if (e.url === '/') {
        this.title = ''
      }
    })

    this.clientService.clientObservable.subscribe((client: Client) => {
      this.client = client
    })

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), map(() => this.activatedRoute), map((route) => {
      while (route.firstChild) route = route.firstChild;
      return route;
    }),
      mergeMap((route) => route.data)).subscribe(async (data) => {
        if (data['title']) {
          this.title = data['title'];
        }
      })

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), map(() => this.activatedRoute), map((route) => {
      while (route.firstChild) route = route.firstChild;
      return route;
    }),
      mergeMap((route) => route.params)).subscribe(async (params) => {
        if (params['tab']) {
          this.title = params['tab'].replaceAll('-', ' ');
        }

        if (params['clientId']) {
          const response = await this.clientService.get(params['clientId']);
          this.clientService.clientSubject.next(response);
          this.client = response;

          this.tabs.forEach((tab) => {
            if (tab.url.includes('clientId')) {
              tab.url = tab.url.replace('clientId', params['clientId'])
            } else {
              const a = (tab.url as string).split('/');
              a[2] = params['clientId'];
              tab.url = a.join('/')
            }
          })

          this.toolbarService.tabsSubject.next(this.tabs)
        }

        if (!params['clientId']) {
          this.tabs = []
        }
      })
  }


  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

}
