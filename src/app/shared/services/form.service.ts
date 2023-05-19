import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public formSubmitObservable = new Observable<boolean>();
  public formSubmitSubject = new BehaviorSubject<boolean>(false);

  public formResetObservable = new Observable<boolean>();
  public formResetSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.formSubmitObservable = this.formSubmitSubject.asObservable();
    this.formResetObservable = this.formResetSubject.asObservable();
  }
}
