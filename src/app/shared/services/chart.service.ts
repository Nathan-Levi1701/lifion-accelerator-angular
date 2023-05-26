import { Injectable } from '@angular/core';
import { db } from '../../firebase/config';
import { addDoc, collection, doc, arrayUnion, updateDoc, query, getDoc } from 'firebase/firestore';
import { FeedbackService } from './feedback.service';
import { LoaderService } from './loader.service';
import OrgChart from '@balkangraph/orgchart.js';
import Client from '~/interfaces/Client.interface';
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor(public feedbackService: FeedbackService, public loaderService: LoaderService) {

  }

  public async addChart(client: Client, tab: string, section: string, data: any) {
    let response: any = {};

    this.loaderService.open();

    try {
      await updateDoc(doc(db, `clients/${client.id}/${tab}/${section}`), { sections: arrayUnion(data.name.replaceAll(' ', '-').toLowerCase()) });

      const rootId = OrgChart.randomId();

      response = await addDoc(collection(db, `clients/${client.id}/${tab}/${section}/${data.name.replaceAll(' ', '-').toLowerCase()}`), {
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
      this.feedbackService.showFeedback(`${data.name} chart created successfully`, 'success');
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error');
    } finally {
      this.loaderService.close()
    }

    return response;
  }

  public async getChart(clientId: string, tab: string, section: string, subSection: string, docId: string) {
    let response: any = {};

    try {
      const docSnapshot = await getDoc(doc(db, `clients/${clientId}/${tab}/${section}/${subSection}/${docId}`));
      if (docSnapshot.exists()) {
        response = docSnapshot.data()
      }
    } catch (error) {

    }

    return response;
  }

  public async updateChart(clientId: string, tab: string, section: string, subSection: string, documentId: string, chart: any) {
    this.loaderService.open();

    let response: any = {};

    try {
      response = await updateDoc(doc(db, `clients/${clientId}/${tab}/${section}/${subSection}/${documentId}`), { data: chart });
      this.feedbackService.showFeedback('Section updated successfully', 'success');
    } catch (error) {
      this.feedbackService.showFeedback(`Error: ${error}`, 'error');
    } finally {
      this.loaderService.close()
    }

    return response;
  }
}