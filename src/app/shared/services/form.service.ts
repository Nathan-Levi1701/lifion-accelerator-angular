import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { db } from '../../../../environments';
import { setDoc, doc, addDoc, collection, DocumentData, QueryDocumentSnapshot, getDocs, query, updateDoc, getDoc } from 'firebase/firestore';
import { FeedbackService } from './feedback.service';
import { LoaderService } from './loader.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  public async getSubSections(clientId: string, tab: string, section: string) {
    let response: any = {};

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

    }

    return response;
  }

  public async getTabGroups(clientId: string, tab: string, section: string) {
    let formGroups: Array<any> = [];
    let chartGroups: Array<any> = [];
    let formLabels: Array<string> = [];

    this.loaderService.open();

    try {
      const subSections = await this.getSubSections(clientId, tab, section);

      if (subSections && subSections['subSections']) {
        subSections['subSections'].forEach(async (subSection: string) => {
          const response = await this.getForms(clientId, tab, section, subSection);

          if (section !== 'enterprise-structure') {
            response.forEach((form) => {
              const subSection = form.subSection;

              const formGroup = new FormGroup({});
              formLabels = [];
              form.data.forEach((f: any) => {
                formLabels.push(f.label);
                formGroup.addControl(f.id, new FormControl(f.value, f.validators ? f.validators.required?.state ? [Validators.required] : [] : []));
              });

              formGroup.updateValueAndValidity()
              formGroups.push({ title: subSection, docId: form.id, formLabels: formLabels, form: formGroup });
            })
          } else {
            formGroups = [];
            chartGroups.push({ title: response[0].subSection, docId: response[0].id, chartData: response[0].data });
          }
        })
      }
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    } finally {
      this.loaderService.close()
    }

    return [formGroups, chartGroups, formLabels];
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