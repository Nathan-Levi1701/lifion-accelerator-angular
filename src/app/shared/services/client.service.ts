import { Injectable } from '@angular/core';
import { db } from '../../firebase/config';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, limit, startAfter, orderBy } from "firebase/firestore";
import Client from '~/interfaces/Client.interface'
import { Observable, BehaviorSubject } from 'rxjs';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public clientObservable = new Observable<Client>();
  public clientSubject = new BehaviorSubject<Client>({} as any);

  constructor(public feedbackService: FeedbackService) {
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
    }

    return response;
  }

  public async create(client: Client) {
    let response: any = {};

    try {
      const clientRef = await addDoc(collection(db, "clients"), {
        name: client.name,
        updatedAt: new Date(),
        createdAt: new Date()
      });
      response = clientRef;
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    }

    return response;
  }

  public async update(client: Client) {
    let response: any = {};

    try {
      response = updateDoc(doc(db, 'clients', client.id as string), { name: client.name, updatedAt: new Date() })
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    }

    return response;
  }

  public async delete(clientId: string) {
    let response: boolean = false;

    try {
      await deleteDoc(doc(db, 'clients', clientId))
      response = true;
    } catch (error) {
      response = false;
      this.feedbackService.showFeedback(`Error: ${error}`, 'error')
    }

    return response;
  }
}
