import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
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

  public clientSubscription!: Subscription;
  public toolbarSubscription!: Subscription;
  public routerSubscription!: Subscription;
  public activatedRouteSubscription!: Subscription;

  constructor(public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService, public clientService: ClientService, public router: Router) {

  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.data.subscribe((data) => {
      if (data['title']) {
        this.title = data['title'];
        this.toolbarService.tabsSubject.next([]);
      }
    })

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(async (params) => {
      if (params['tab']) {
        this.title = params['tab']
      }

      if (params['clientId'] && !this.client.id) {
        const response = await this.clientService.get(params['clientId']);
        this.clientService.clientSubject.next(response);
        this.client = response;
      }
    })

    this.toolbarSubscription = this.toolbarService.tabsObservable.subscribe((tabs) => {
      this.tabs = tabs;
    });

    this.routerSubscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((e: any) => {
      if (e.url === '/') {
        this.title = ''
        this.tabs = [];
        this.toolbarService.tabsSubject.next([]);
      }
    });

    this.clientSubscription = this.clientService.clientObservable.subscribe((client: Client) => {
      this.client = client;

      this.tabs.forEach((tab) => {
        if (tab.url.includes('clientId')) {
          tab.url = tab.url.replace('clientId', client.id)
        } else {
          const a = (tab.url as string).split('/');
          a[2] = client.id!;
          tab.url = a.join('/')
        }
      })

      this.toolbarService.tabsSubject.next(this.tabs)
    });
  }

  ngOnDestroy(): void {
    this.clientSubscription.unsubscribe();
    this.toolbarSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
    this.activatedRouteSubscription.unsubscribe();
  }
}
