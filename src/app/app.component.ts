import { Component } from '@angular/core';
import { ToolbarService } from '~/services/toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lifion-accelerator-angular';

  public state: boolean = true;

  constructor(public toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.toolbarService.toggleMenuObservable.subscribe((state: boolean) => {
      this.state = state;
    });
  }

  ngOnDestroy(): void {

  }
}
