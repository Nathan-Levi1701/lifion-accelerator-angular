import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarService } from '~/services/toolbar.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {
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
  }

  ngOnInit(): void {

  }

  public async onNavigation() {
    this.router.navigateByUrl(this.router.url)
  }
}
