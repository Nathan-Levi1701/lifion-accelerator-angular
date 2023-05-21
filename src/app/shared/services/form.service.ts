import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { db } from '../../firebase/config';
import { setDoc, doc, addDoc, collection, DocumentData, QueryDocumentSnapshot, getDocs, query, updateDoc, getDoc } from 'firebase/firestore';
import { FeedbackService } from './feedback.service';
@Injectable({
  providedIn: 'root'
})
export class FormService {
  public formObservable = new Observable<any>();
  public formSubject = new BehaviorSubject<any>({});

  constructor(public feedbackService: FeedbackService) {
    this.formObservable = this.formSubject.asObservable();
  }

  public async addForm(clientId: string, tab: string, section: string, subSection: string, allSections: Array<string>, form: any) {
    let response: any = {};

    try {
      await setDoc(doc(db, `clients/${clientId}/${tab}/${section}`), { sections: allSections });
      response = await addDoc(collection(db, `clients/${clientId}/${tab}/${section}/${subSection}`), { data: form });
      this.feedbackService.showFeedback('Success: Client data initialized', 'success');
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error');
    }

    return response;
  }

  public async updateForm(clientId: string, tab: string, section: string, subSection: string, documentId: string, form: any) {
    let response: any = {};

    try {
      response = updateDoc(doc(db, `clients/${clientId}/${tab}/${section}/${subSection}/${documentId}`), { data: form });
      this.feedbackService.showFeedback('Success: Section updated', 'success');
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error');
    }

    return response;
  }

  public async getSections(clientId: string, tab: string, section: string) {
    let response: any = {};

    try {
      const document = await getDoc(doc(db, `clients/${clientId}/${tab}/${section}`));
      if (document.exists()) {
        response = document.data()
      } else {
        this.feedbackService.showFeedback('Error: Data does not exist for this section', 'error')
      }
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    }

    return response;
  }

  public async getForms(clientId: string, tab: string, section: string, subSection: string) {
    let response: Array<any> = [];
    try {
      const querySnapshot = await getDocs(query(collection(db, `clients/${clientId}/${tab}/${section}/${subSection}`)))
      querySnapshot.forEach(async (doc: QueryDocumentSnapshot<DocumentData>) => {
        response.push({ id: doc.id, subSection: subSection, data: doc.data()['data'] });
      });
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    }

    return response;
  }
}