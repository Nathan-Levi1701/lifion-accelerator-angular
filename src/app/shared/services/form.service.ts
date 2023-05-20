import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { db } from '../../firebase/config';
import { setDoc, doc, addDoc, collection, DocumentData, QueryDocumentSnapshot, getDocs, query, updateDoc, getDoc } from 'firebase/firestore';
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

  public async addForm(clientId: string, tab: string, section: string, subSection: string, allSections: Array<string>, form: any) {
    await setDoc(doc(db, `clients/${clientId}/${tab}/${section}`), { sections: allSections });
    const response = await addDoc(collection(db, `clients/${clientId}/${tab}/${section}/${subSection}`), { data: form });
    return response;
  }

  public async updateForm(clientId: string, tab: string, section: string, subSection: string, documentId: string, form: any) {
    const response = await updateDoc(doc(db, `clients/${clientId}/${tab}/${section}/${subSection}/${documentId}`), { data: form });
    return response;
  }

  public async getSections(clientId: string, tab: string, section: string) {
    let response: any = {};

    const document = await getDoc(doc(db, `clients/${clientId}/${tab}/${section}`));
    if (document.exists()) {
      response = document.data()
    }

    return response;
  }

  public async getForms(clientId: string, tab: string, section: string, subSection: string) {
    let response: Array<any> = [];
    const querySnapshot = await getDocs(query(collection(db, `clients/${clientId}/${tab}/${section}/${subSection}`)))
    querySnapshot.forEach(async (doc: QueryDocumentSnapshot<DocumentData>) => {
      response.push({ id: doc.id, subSection: subSection, data: doc.data()['data'] });
    });

    return response;
  }
}
