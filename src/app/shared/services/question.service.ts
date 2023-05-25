import { Injectable } from '@angular/core';
import { db } from '../../firebase/config';
import { getDocs, collection, orderBy, query, QueryDocumentSnapshot, DocumentData, getDoc, doc } from 'firebase/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoaderService } from './loader.service';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public questionObservable = new Observable<Array<any>>();
  public questionSubject = new BehaviorSubject<Array<any>>([]);


  constructor(public feedbackService: FeedbackService, public loaderService: LoaderService) {
    this.questionObservable = this.questionSubject.asObservable();
    this.questionObservable = this.questionSubject.asObservable();
  }

  public async getSections(tab: string) {
    let response: any = {};

    try {
      const document = await getDoc(doc(db, `hcm/${tab}`));
      if (document.exists()) {
        response = document.data()
      }
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    }

    return response;
  }

  public async getQuestions(tab: string, section: string) {
    let response: Array<any> = [];

    try {
      const querySnapshot = await getDocs(query(collection(db, `hcm/${tab}/${section}`), orderBy("id", "asc")))
      querySnapshot.forEach(async (doc: QueryDocumentSnapshot<DocumentData>) => {
        response.push({ id: doc.id, data: doc.data()['data'] });
      });
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    }

    return response;
  }


  public loadTabs(questions: Array<any>) {
    this.questionSubject.next(questions)
  }
}
