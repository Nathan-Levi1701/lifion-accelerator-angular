import { Injectable } from '@angular/core';
import { db } from '../../../../environments';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, limit, startAfter, orderBy, setDoc } from "firebase/firestore";
import Client from '~/interfaces/Client.interface'
import { Observable, BehaviorSubject } from 'rxjs';
import { FeedbackService } from './feedback.service';
import { LoaderService } from './loader.service';
import { QuestionService } from './question.service';
import OrgChart from '@balkangraph/orgchart.js';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public clientObservable = new Observable<Client>();
  public clientSubject = new BehaviorSubject<Client>({} as any);

  constructor(public loaderService: LoaderService, private feedbackService: FeedbackService, private questionService: QuestionService) {
    this.clientObservable = this.clientSubject.asObservable();
  }

  public async get(clientId: string) {
    let response: any = {};

    try {
      const client = await getDoc(doc(db, 'clients', clientId))
      response = { id: client.id, name: client.data()?.['name'], createdAt: client.data()?.['createdAt'].toDate(), updatedAt: client.data()?.['updatedAt'].toDate() };
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    }

    return response
  }

  public async getClients(skip = 0, count = 25) {
    let response: any = {};

    this.loaderService.open();

    try {
      const clients: Array<Client> = [];
      const querySnapshot = await getDocs(query(collection(db, "clients"), orderBy('name'), startAfter(skip), limit(count)));
      querySnapshot.forEach((doc) => {
        clients.push({ id: doc.id, name: doc.data()['name'], createdAt: doc.data()['createdAt'].toDate(), updatedAt: doc.data()['updatedAt'].toDate() });
      });

      skip = count
      response = clients;
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    } finally {
      this.loaderService.close()
    }

    return response;
  }

  public async create(client: Client) {
    let response: any = {};

    this.loaderService.open();

    try {
      const clientRef = await addDoc(collection(db, "clients"), {
        name: client.name,
        updatedAt: new Date(),
        createdAt: new Date()
      });
      response = clientRef;


      const sections = await this.questionService.getSections('hr-structure');

      let questions: Array<any> = [];

      for await (const section of sections['sections']) {
        questions.push(await this.questionService.getQuestions('hr-structure', section));
      }

      let index = 0;

      for await (const section of questions) {
        await setDoc(doc(db, `clients/${response.id}/hr-structure/${sections['sections'][index]}`), { subSections: section.map((p: any) => { return p.id }) });
        for await (const subSection of section) {
          if (subSection.id === 'organization-chart') {
            const rootId = OrgChart.randomId()
            await addDoc(collection(db, `clients/${response.id}/hr-structure/${sections['sections'][index]}/${subSection.id}`), {
              data: [
                {
                  id: rootId,
                  name: client.name,
                  code: 'EU-0',
                  reportsToCode: '',
                  role: 'Root',
                  parentStructure: 'Enterprise Structure',
                  childStructure: 'Enterprise Substructure 13',
                  relationship: 'partOf',
                  tags: ['root'],
                },
                {
                  id: OrgChart.randomId(),
                  pid: rootId,
                  name: `${client.name} Sub Structure`,
                  code: 'EU-13',
                  reportsToCode: 'EU-0',
                  role: 'Root',
                  parentStructure: 'Enterprise Structure 13',
                  childStructure: 'Enterprise Substructure 13',
                  relationship: 'partOf',
                  tags: ['subRoot'],
                }
              ]
            });
          } else {
            await addDoc(collection(db, `clients/${response.id}/hr-structure/${sections['sections'][index]}/${subSection.id}`), { data: subSection.data });
          }
        }
        ++index;
      }

      this.feedbackService.showFeedback(`Success: New client created`, 'success')
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    } finally {
      this.loaderService.close()
    }

    return response;
  }

  public async update(client: Client) {
    let response: any = {};

    this.loaderService.open();

    try {
      response = await updateDoc(doc(db, 'clients', client.id as string), { name: client.name, updatedAt: new Date() })
      this.feedbackService.showFeedback(`Success: Client updated`, 'success')
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    } finally {
      this.loaderService.close();
    }

    return response;
  }

  public async delete(clientId: string) {
    let response: boolean = false;

    this.loaderService.open();

    try {
      await deleteDoc(doc(db, 'clients', clientId))
      this.feedbackService.showFeedback(`Success: Client deleted`, 'success')
      response = true;
    } catch (error) {
      response = false;
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    } finally {
      this.loaderService.close();
    }

    return response;
  }
}
