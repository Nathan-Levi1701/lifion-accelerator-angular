import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { db } from '../../firebase/config';
import { setDoc, doc, addDoc, collection, DocumentData, QueryDocumentSnapshot, getDocs, query, updateDoc, getDoc } from 'firebase/firestore';
import { FeedbackService } from './feedback.service';
import { LoaderService } from './loader.service';
@Injectable({
  providedIn: 'root'
})
export class FormService {
  public formObservable = new Observable<any>();
  public formSubject = new BehaviorSubject<any>({});

  constructor(public feedbackService: FeedbackService, public loaderService: LoaderService) {
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
    this.loaderService.open();

    let response: any = {};

    try {
      response = await updateDoc(doc(db, `clients/${clientId}/${tab}/${section}/${subSection}/${documentId}`), { data: form });
      this.feedbackService.showFeedback('Section updated successfully', 'success');
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error');
    } finally {
      this.loaderService.close()
    }

    return response;
  }

  public async updateForms(clientId: string, tab: string, section: string, subSections: Array<string>, documentIds: Array<string>, forms: Array<any>) {
    this.loaderService.open();

    let response: Array<Promise<any>> = [];

    try {
      for (let i = 0; i < documentIds.length; i++) {
        response.push(updateDoc(doc(db, `clients/${clientId}/${tab}/${section}/${subSections[i]}/${documentIds[i]}`), { data: forms[i] }));
      }

      await Promise.all(response);

      this.feedbackService.showFeedback('Section updated successfully', 'success');
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error');
    } finally {
      this.loaderService.close()
    }

    return response;
  }

  public async getSections(clientId: string, tab: string, section: string) {
    let response: any = {};

    this.loaderService.open();

    try {
      const document = await getDoc(doc(db, `clients/${clientId}/${tab}/${section}`));
      if (document.exists()) {
        response = document.data()
      } else {
        this.feedbackService.showFeedback('Data does not exist for this section', 'error')
      }
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    } finally {
      this.loaderService.close();
    }

    return response;
  }

  public async getForms(clientId: string, tab: string, section: string, subSection: string) {
    let response: Array<any> = [];

    // const loaderRef = this.loaderService.open();

    try {
      const querySnapshot = await getDocs(query(collection(db, `clients/${clientId}/${tab}/${section}/${subSection}`)))
      querySnapshot.forEach(async (doc: QueryDocumentSnapshot<DocumentData>) => {
        response.push({ id: doc.id, subSection: subSection, data: doc.data()['data'] });
      });
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    } finally {
      // loaderRef.close()
    }

    return response;
  }
}