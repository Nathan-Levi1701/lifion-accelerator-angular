import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { ClientService } from '~/services/client.service';
import { ToolbarService } from '~/services/toolbar.service';
import NavigationContent from '~/assets/json/drawer_content.json';

@Component({
  selector: 'drawer-content',
  templateUrl: './drawer-content.component.html',
  styleUrls: ['./drawer-content.component.scss']
})
export class DrawerContentComponent implements OnInit, OnDestroy {
  public clientId: string = '';
  public navigationContent = NavigationContent;

  constructor(public router: Router, public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService, public clientService: ClientService) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), map(() => this.activatedRoute), map((route) => {
      while (route.firstChild) route = route.firstChild;
      return route;
    }),
      mergeMap((route) => route.params)).subscribe(async (params) => {
        if (params['tab'] && params['clientId']) {
          const navigationChildren = this.navigationContent.find((tab: { url: any; }) => { return (tab.url as string).includes(params['tab']) })?.children as Array<any>;

          navigationChildren.forEach((child) => {
            child.url = child.url.replace('clientId', params['clientId'])
          });

          this.toolbarService.tabsSubject.next(navigationChildren);
        }
      })

    clientService.clientObservable.subscribe((client) => {
      if (client && client.id) {
        this.clientId = client.id;
      }
    })
  }

  ngOnInit(): void {

  }

  public async onNavigation(index: number, children: Array<any>) {
    if (this.clientId) {

      this.router.navigate([children[index].url?.replace('clientId', this.clientId)])
      this.toolbarService.tabsSubject.next(children)
    } else {
      this.router.navigateByUrl('/view/clients');
    }
  }

  ngOnDestroy(): void {
  }
}
