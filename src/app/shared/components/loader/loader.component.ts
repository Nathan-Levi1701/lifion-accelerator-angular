import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() state = 'loading' || 'complete' || 'error' || 'error';

  constructor() {
  }

  ngOnInit(): void {

  }

}
