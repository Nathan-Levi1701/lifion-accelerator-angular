import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolbarService } from '~/services/toolbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public state: boolean = true;

  constructor(public toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.toolbarService.toggleMenuObservable.subscribe((state: boolean) => {
      this.state = state;
    });
  }

  ngOnDestroy(): void {
    // this.toolbarService.tabsSubject.unsubscribe();
  }

}
