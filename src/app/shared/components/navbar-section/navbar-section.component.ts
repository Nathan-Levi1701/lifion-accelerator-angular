import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter, map, mergeMap, tap } from 'rxjs';
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
          this.tabs.forEach((tab) => {
            tab.url = tab.url.replace('clientId', params['clientId'])
          })

          const response = await this.clientService.get(params['clientId']);
          this.clientService.clientSubject.next(response);
          this.client = response;
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
