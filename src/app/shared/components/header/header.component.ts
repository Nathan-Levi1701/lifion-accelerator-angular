import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Client from '~/interfaces/Client.interface';
import { AuthService } from '~/services/auth.service';
import { ToolbarService } from '~/services/toolbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public state: boolean = true;
  public client: Client = {} as any;
  public toolbarSubscription!: Subscription;

  constructor(public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.toolbarSubscription = this.toolbarService.toggleMenuObservable.subscribe((state: boolean) => {
      this.state = state;
    });
  }

  ngOnDestroy(): void {
    this.toolbarSubscription.unsubscribe();
  }

}
