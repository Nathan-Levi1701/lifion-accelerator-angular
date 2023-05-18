import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  public toggleMenuObservable = new Observable<boolean>();
  public toggleMenuSubject = new BehaviorSubject<boolean>(true);

  public tabsObservable = new Observable<Array<any>>();
  public tabsSubject = new BehaviorSubject<Array<any>>([]);


  constructor() {
    this.toggleMenuObservable = this.toggleMenuSubject.asObservable();
    this.tabsObservable = this.tabsSubject.asObservable();
  }

  public toggleMenu(state: boolean) {
    this.toggleMenuSubject.next(state);
  }

  public loadTabs(tabs: Array<any>) {
    this.tabsSubject.next(tabs)
  }
}
