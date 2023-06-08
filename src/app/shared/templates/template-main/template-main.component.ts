import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '~/services/toolbar.service';

@Component({
  selector: 'template-main',
  templateUrl: './template-main.component.html',
  styleUrls: ['./template-main.component.scss']
})

export class TemplateMainComponent implements OnInit {
  public state: boolean = true;

  constructor(public toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.toolbarService.toggleMenuObservable.subscribe((state: boolean) => {
      this.state = state;
    });
  }

  ngOnDestroy(): void {
    this.toolbarService.toggleMenuSubject.unsubscribe();
  }
}
