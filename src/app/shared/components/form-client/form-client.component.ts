import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { setDoc, doc, addDoc, collection } from 'firebase/firestore';
import { ClientService } from '~/services/client.service';
import { FormService } from '~/services/form.service';
import { QuestionService } from '~/services/question.service';
import { db } from '../../../firebase/config';
import OrgChart from '@balkangraph/orgchart.js';
@Component({
  selector: 'form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})


export class FormClientComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup = new FormGroup({});

  constructor(public fb: FormBuilder, public clientService: ClientService, public formService: FormService, public questionService: QuestionService, public activatedRoute: ActivatedRoute, public router: Router) {
    this.formGroup = fb.group({
      id: [''],
      name: ['', [Validators.required]],
      createdAt: [''],
      updatedAt: [''],
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      if (params['id']) {
        const response = await this.clientService.get(params['id']);
        if (response) {
          this.formGroup.setValue(response)
        }
      }
    })
  }

  async onSubmit(formGroup: FormGroup) {
    if (formGroup.valid) {
      if (formGroup.get('id')?.value) {
        await this.clientService.update(formGroup.value);
        this.router.navigateByUrl('/view/clients');

      } else {
        const response = await this.clientService.create(formGroup.value);
        const sections = await this.questionService.getSections('hr-structure');

        let questions: Array<any> = [];

        for await (const section of sections['sections']) {
          questions.push(await this.questionService.getQuestions('hr-structure', section));
        }

        let index = 0;

        for await (const section of questions) {
          await setDoc(doc(db, `clients/${response.id}/hr-structure/${sections['sections'][index]}`), { sections: section.map((p: any) => { return p.id }) });
          for await (const subSection of section) {
            if (subSection.id === 'organization-chart') {
              const rootId = OrgChart.randomId()
              await addDoc(collection(db, `clients/${response.id}/hr-structure/${sections['sections'][index]}/${subSection.id}`), {
                data: [
                  {
                    id: rootId,
                    name: formGroup.get('name')?.value,
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
                    name: `${formGroup.get('name')?.value} Sub Structure`,
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

        this.router.navigateByUrl(`client/${response.id}/hr-structure/process-questions`);
      }
    }
  }

  ngOnDestroy(): void {

  }
}
