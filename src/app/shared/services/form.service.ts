import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { db } from '../../firebase/config';
import { setDoc, doc, addDoc, collection } from 'firebase/firestore';
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

  public async addForm(clientId: string, tab: string, section: string, subSection: string, form: any) {
    await setDoc(doc(db, `clients/${clientId}/${tab}/${section}`), {})

    const response = await addDoc(collection(db, `clients/${clientId}/${tab}/${section}/${subSection}`), { data: form });
    return response;
  }
}
