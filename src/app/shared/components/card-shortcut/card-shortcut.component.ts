import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-shortcut',
  templateUrl: './card-shortcut.component.html',
  styleUrls: ['./card-shortcut.component.scss']
})
export class CardShortCutComponent implements OnInit {
  @Input() public title: string = '';
  @Input() public description: string = '';
  @Input() public icon: string = '';

  constructor() {
  }

  ngOnInit(): void {

  }
}
