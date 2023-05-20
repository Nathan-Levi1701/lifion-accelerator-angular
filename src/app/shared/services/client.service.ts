import { Injectable } from '@angular/core';
import { db } from '../../firebase/config';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, limit, startAfter, orderBy, onSnapshot } from "firebase/firestore";
import Client from '~/interfaces/Client.interface'
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public clientObservable = new Observable<Client>();
  public clientSubject = new BehaviorSubject<Client>({} as any);

  constructor() {
    this.clientObservable = this.clientSubject.asObservable();
  }

  public async get(clientId: string) {
    const client = await getDoc(doc(db, 'clients', clientId))
    return { id: client.id, name: client.data()?.['name'], createdAt: client.data()?.['createdAt'].toDate(), updatedAt: client.data()?.['updatedAt'].toDate() }
  }

  public async getClients(skip = 0, count = 25) {
    const clients: Array<Client> = [];

    const querySnapshot = await getDocs(query(collection(db, "clients"), orderBy('name'), startAfter(skip), limit(count)));
    querySnapshot.forEach((doc) => {
      clients.push({ id: doc.id, name: doc.data()['name'], createdAt: doc.data()['createdAt'].toDate(), updatedAt: doc.data()['updatedAt'].toDate() });
    });

    skip = count

    return clients;
  }

  public async create(client: Client) {
    const clientRef = await addDoc(collection(db, "clients"), {
      name: client.name,
      updatedAt: new Date(),
      createdAt: new Date()
    });

    return clientRef
  }

  public async update(client: Client) {
    return updateDoc(doc(db, 'clients', client.id as string), { name: client.name, updatedAt: new Date() })
  }

  public async delete(clientId: string) {
    return deleteDoc(doc(db, 'clients', clientId))
  }
}
