import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import Client from '~/interfaces/Client.interface';
import { ClientService } from '~/services/client.service';
import { ToolbarService } from '~/services/toolbar.service';

@Component({
  selector: 'drawer-content',
  templateUrl: './drawer-content.component.html',
  styleUrls: ['./drawer-content.component.scss']
})
export class DrawerContentComponent implements OnInit, OnDestroy {
  public clientId: string = '';

  public navigation: any = [
    {
      name: "HR Structure",
      icon: 'account_tree',
      url: "/client/clientId/hr-structure",
      children: [
        {
          name: "Process Questions",
          icon: 'account_tree',
          url: "/client/clientId/hr-structure/process-questions",
        },
        {
          name: "Legal Entities",
          icon: 'account_tree',
          url: "/client/clientId/hr-structure/legal-entities",
        },
        {
          name: "Cost Center",
          icon: 'account_tree',
          url: "/client/clientId/hr-structure/cost-center",
        },
        {
          name: "Locations",
          icon: 'account_tree',
          url: "/client/clientId/hr-structure/locations",
        },
        {
          name: "Enterprise Structure",
          icon: 'account_tree',
          url: "/client/clientId/hr-structure/enterprise-structure",
        },
        {
          name: "Enterprise Unit",
          icon: 'account_tree',
          url: "/client/clientId/hr-structure/enterprise-unit",
        }
      ]
    },
    {
      name: "Work Agreements and Associate Classification",
      icon: 'handshake',
      url: "/client/clientId/work-agreements-and-associate-classification",
      children: [
        {
          name: "Associate Classifications",
          icon: 'account_tree',
          url: "/client/clientId/work-agreements-and-associate-classification/associate-classifications",
        },
        {
          name: "Unions",
          icon: 'account_tree',
          url: "/client/clientId/work-agreements-and-associate-classification/unions",
        },
        {
          name: "Work Relationship",
          icon: 'account_tree',
          url: "/client/clientId/work-agreements-and-associate-classification/work-relationship",
        },
      ],
    },
    {
      name: "Job Architecture",
      icon: 'room_preferences',
      url: "/client/job-architecture",
      children: [
        {
          name: "Job Architecture Summary",
          icon: 'account_tree',
          url: "/client/job-architecture/job-architecture-summary",
        },
        {
          name: "Job Template",
          icon: 'account_tree',
          url: "/client/job-architecture/job-template",
        },
        {
          name: "Job Bands",
          icon: 'account_tree',
          url: "/client/job-architecture/job-bands",
        },
        {
          name: "Job Levels",
          icon: 'account_tree',
          url: "/client/job-architecture/job-levels",
        },
        {
          name: "Job Mapping Template",
          icon: 'account_tree',
          url: "/client/job-architecture/job-mapping-template",
        },
      ],
    },
    {
      name: "Hire-Rehire",
      icon: 'work_outline',
      url: "/client/hire-rehire",
      children: [
        {
          name: "Hire Process Summary",
          icon: 'account_tree',
          url: "/client/hire-rehire/hire-process-summary",
        },
      ],
    },
    {
      name: "ESS-MSS",
      icon: 'badge',
      url: "/client/ess-mss",
      children: [
        {
          name: "Initiator Approver Roles",
          icon: 'account_tree',
          url: "/client/ess-mss/initiator-approver-rules",
        },
        {
          name: "Associate Profile (ESS)",
          icon: 'account_tree',
          url: "/client/ess-mss/associate-profile",
        },
        {
          name: "Associate Employment (MSS)",
          icon: 'account_tree',
          url: "/client/ess-mss/associate-employment",
        },
      ],
    },
    {
      name: "Employment Data Change",
      icon: 'change_circle',
      url: "/client/employment-data-change",
      children: [
        {
          name: "Movement Design Decisions",
          icon: 'account_tree',
          url: "/client/employment-data-change/movement-design-decisions",
        },
        {
          name: "Movement Type and Movement Reasons",
          icon: 'account_tree',
          url: "/client/employment-data-change/movement-type-and-movement-reasons",
        },
        // Need to revise
        {
          name: "Code Analysis",
          icon: 'account_tree',
          url: "/client/employment-data-change/code-analysis",
        },

      ],
    },
    {
      name: "LOA",
      icon: 'holiday_village',
      url: "/client/LOA",
      children: [
        {
          name: "Leave Types & Reasons",
          icon: 'account_tree',
          url: "/client/loa/leave-types-and-reasons",
        },
        // Need to revise
        {
          name: "LOA Questions",
          icon: 'account_tree',
          url: "/client/loa/loa-questions",
        },
      ],
    },
    {
      name: "License & Certification",
      icon: 'card_membership',
      url: "/client/license-and-certification",
      children: [
        {
          name: "License Certification Type",
          icon: 'account_tree',
          url: "/client/license-and-certification/license-certification-type",
        },
        {
          name: "Associate License Certification Data",
          icon: 'account_tree',
          url: "/client/license-and-certification/associate-license-certification-data",
        },
      ],
    },
    {
      name: "Compensation",
      icon: 'account_balance_wallet',
      url: "/client/compensation",
      children: [],
    },
    {
      name: "Annual Compensation",
      icon: 'paid',
      url: "/client/annual-compensation",
      children: [],
    },
    {
      name: "PreBoard-OnBoard",
      icon: 'waving_hand',
      url: "/client/preboard-onboard",
      children: [],
    },
    {
      name: "Performance Management",
      icon: 'thumbs_up_down',
      url: "/client/performance-management",
      children: [],
    },
    {
      name: "Reporting",
      icon: 'summarize',
      url: "/client/reporting",
      children: [],
    },
    {
      name: "Authorizations",
      icon: 'admin_panel_settings',
      url: "/client/authorizations",
      children: [],
    },
    {
      name: "Worker's Compensation",
      icon: 'emoji_events',
      url: "/client/workers-compensation",
      children: [],
    },
  ];


  constructor(public router: Router, public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService, public clientService: ClientService) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), map(() => this.activatedRoute), map((route) => {
      while (route.firstChild) route = route.firstChild;
      return route;
    }),
      mergeMap((route) => route.params)).subscribe(async (params) => {
        if (params['tab'] && params['clientId']) {
          let x = this.navigation.find((tab: { url: any; }) => { return (tab.url as string).includes(params['tab']) }).children

          for (let i = 0; i < x.length; i++) {
            x[i].url = x[i].url.replace('clientId', params['clientId'])
          }

          this.toolbarService.tabsSubject.next(x);
        }
      })

    clientService.clientObservable.subscribe((client) => {
      if (client && client.id) {
        this.clientId = client.id;
      }
    })
  }

  ngOnInit(): void {

  }

  public async onNavigation(index: number, children: Array<any>) {
    if (this.clientId) {

      this.router.navigate([children[index].url?.replace('clientId', this.clientId)])
      this.toolbarService.tabsSubject.next(children)
    } else {
      this.router.navigateByUrl('/view/clients');
    }
  }

  ngOnDestroy(): void {
  }
}
