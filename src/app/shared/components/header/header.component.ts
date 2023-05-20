import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Client from '~/interfaces/Client.interface';
import { ToolbarService } from '~/services/toolbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public state: boolean = true;
  public client: Client = {} as any;

  constructor(public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService) {
  }

  ngOnInit(): void {
    this.toolbarService.toggleMenuObservable.subscribe((state: boolean) => {
      this.state = state;
    });
  }

  ngOnDestroy(): void {
    // this.toolbarService.tabsSubject.unsubscribe();
  }

}
