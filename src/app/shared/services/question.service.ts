import { Injectable } from '@angular/core';
import { db } from '../../firebase/config';
import { getDocs, collection, orderBy, query, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public questionObservable = new Observable<Array<any>>();
  public questionSubject = new BehaviorSubject<Array<any>>([]);


  constructor() {
    this.questionObservable = this.questionSubject.asObservable();
    this.questionObservable = this.questionSubject.asObservable();
  }

  public async getQuestions(tab: string, section: string) {
    let response: Array<any> = [];
    const querySnapshot = await getDocs(query(collection(db, `hcm/${tab}/${section}`), orderBy("id", "asc")))
    querySnapshot.forEach(async (doc: QueryDocumentSnapshot<DocumentData>) => {
      response.push({ id: doc.id, data: doc.data()['data'] });
    });

    return response;
  }


  public loadTabs(questions: Array<any>) {
    this.questionSubject.next(questions)
  }
}
