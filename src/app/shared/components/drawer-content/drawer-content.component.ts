import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  public clientSubscription!: Subscription;
  public activatedRouteSubscription!: Subscription;

  constructor(public router: Router, public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService, public clientService: ClientService) {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params) => {
      if (params['tab'] && params['clientId']) {
        const navigationChildren: Array<any> = this.navigationContent.find((tab) => { return tab.url.includes(params['tab']) })?.children!;

        navigationChildren.forEach((child) => {
          child.url = child.url.replace('clientId', params['clientId'])
        });

        this.toolbarService.tabsSubject.next(navigationChildren);
      }
    })

    this.clientSubscription = clientService.clientObservable.subscribe((client) => {
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
    this.clientSubscription.unsubscribe();
    this.activatedRouteSubscription.unsubscribe();
  }
}
