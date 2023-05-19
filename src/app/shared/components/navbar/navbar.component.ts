import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
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

  constructor(public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService, router: Router) {
    this.router = router;

    toolbarService.tabsObservable.subscribe((tabs) => {
      this.tabs = tabs
    })

    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.title = params['id']
      }
    })

    activatedRoute.data.subscribe((data: Data) => {
      this.title = data['title']

      if (data['tabs']) {
        this.tabs = []
      }
    })
  }

  ngOnInit(): void {

  }

  public async onNavigation() {
    this.router.navigateByUrl(this.router.url)
  }

  ngOnDestroy(): void {
    this.toolbarService.toggleMenuSubject.unsubscribe();
  }

}
