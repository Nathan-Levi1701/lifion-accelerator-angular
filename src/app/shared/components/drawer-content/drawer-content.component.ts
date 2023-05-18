import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarService } from '~/services/toolbar.service';

@Component({
  selector: 'drawer-content',
  templateUrl: './drawer-content.component.html',
  styleUrls: ['./drawer-content.component.scss']
})
export class DrawerContentComponent implements OnInit {
  public router: Router;

  public navigation: any = [
    {
      name: "HR Structure",
      icon: 'account_tree',
      url: "/clients/hr-structure",
      children: [
        {
          name: "Process Questions",
          icon: 'account_tree',
          url: "/clients/hr-structure/process-questions",
        },
        {
          name: "Legal Entities",
          icon: 'account_tree',
          url: "/clients/hr-structure/legal-entities",
        },
        {
          name: "Cost Centers",
          icon: 'account_tree',
          url: "/clients/hr-structure/cost-centers",
        },
        {
          name: "Locations",
          icon: 'account_tree',
          url: "/clients/hr-structure/locations",
        },
        {
          name: "Enterprise Structure",
          icon: 'account_tree',
          url: "/clients/hr-structure/enterprise-structure",
        },
        {
          name: "Enterprise Unit",
          icon: 'account_tree',
          url: "/clients/hr-structure/enterprise-unit",
        }
      ]
    },
    {
      name: "Work Agreements and Associate Classification",
      icon: 'handshake',
      url: "/clients/work-agreements-and-associate-classification",
      children: [
        {
          name: "Associate Classifications",
          icon: 'account_tree',
          url: "/clients/work-agreements-and-associate-classification/associate-classifications",
        },
        {
          name: "Unions",
          icon: 'account_tree',
          url: "/clients/work-agreements-and-associate-classification/unions",
        },
        {
          name: "Work Relationship",
          icon: 'account_tree',
          url: "/clients/work-agreements-and-associate-classification/work-relationship",
        },
      ],
    },
    {
      name: "Job Architecture",
      icon: 'room_preferences',
      url: "/clients/job-architecture",
      children: [
        {
          name: "Job Architecture Summary",
          icon: 'account_tree',
          url: "/clients/job-architecture/job-architecture-summary",
        },
        {
          name: "Job Template",
          icon: 'account_tree',
          url: "/clients/job-architecture/job-template",
        },
        {
          name: "Job Bands",
          icon: 'account_tree',
          url: "/clients/job-architecture/job-bands",
        },
        {
          name: "Job Levels",
          icon: 'account_tree',
          url: "/clients/job-architecture/job-levels",
        },
        {
          name: "Job Mapping Template",
          icon: 'account_tree',
          url: "/clients/job-architecture/job-mapping-template",
        },
      ],
    },
    {
      name: "Hire-Rehire",
      icon: 'work_outline',
      url: "/clients/hire-rehire",
      children: [
        {
          name: "Hire Process Summary",
          icon: 'account_tree',
          url: "/clients/hire-rehire/hire-process-summary",
        },
      ],
    },
    {
      name: "ESS-MSS",
      icon: 'badge',
      url: "/clients/ess-mss",
      children: [
        {
          name: "Initiator Approver Roles",
          icon: 'account_tree',
          url: "/clients/ess-mss/initiator-approver-rules",
        },
        {
          name: "Associate Profile (ESS)",
          icon: 'account_tree',
          url: "/clients/ess-mss/associate-profile",
        },
        {
          name: "Associate Employment (MSS)",
          icon: 'account_tree',
          url: "/clients/ess-mss/associate-employment",
        },
      ],
    },
    {
      name: "Employment Data Change",
      icon: 'change_circle',
      url: "/clients/employment-data-change",
      children: [
        {
          name: "Movement Design Decisions",
          icon: 'account_tree',
          url: "/clients/employment-data-change/movement-design-decisions",
        },
        {
          name: "Movement Type and Movement Reasons",
          icon: 'account_tree',
          url: "/clients/employment-data-change/movement-type-and-movement-reasons",
        },
        // Need to revise
        {
          name: "Code Analysis",
          icon: 'account_tree',
          url: "/clients/employment-data-change/code-analysis",
        },

      ],
    },
    {
      name: "LOA",
      icon: 'holiday_village',
      url: "/clients/LOA",
      children: [
        {
          name: "Leave Types & Reasons",
          icon: 'account_tree',
          url: "/clients/loa/leave-types-and-reasons",
        },
        // Need to revise
        {
          name: "LOA Questions",
          icon: 'account_tree',
          url: "/clients/loa/loa-questions",
        },
      ],
    },
    {
      name: "License & Certification",
      icon: 'card_membership',
      url: "/clients/license-and-certification",
      children: [
        {
          name: "License Certification Type",
          icon: 'account_tree',
          url: "/clients/license-and-certification/license-certification-type",
        },
        {
          name: "Associate License Certification Data",
          icon: 'account_tree',
          url: "/clients/license-and-certification/associate-license-certification-data",
        },
      ],
    },
    {
      name: "Compensation",
      icon: 'account_balance_wallet',
      url: "/clients/compensation",
      children: [],
    },
    {
      name: "Annual Compensation",
      icon: 'paid',
      url: "/clients/annual-compensation",
      children: [],
    },
    {
      name: "PreBoard-OnBoard",
      icon: 'waving_hand',
      url: "/clients/preboard-onboard",
      children: [],
    },
    {
      name: "Performance Management",
      icon: 'thumbs_up_down',
      url: "/clients/performance-management",
      children: [],
    },
    {
      name: "Reporting",
      icon: 'summarize',
      url: "/clients/reporting",
      children: [],
    },
    {
      name: "Authorizations",
      icon: 'admin_panel_settings',
      url: "/clients/authorizations",
      children: [],
    },
    {
      name: "Worker's Compensation",
      icon: 'emoji_events',
      url: "/clients/workers-compensation",
      children: [],
    },
  ];


  constructor(router: Router, activatedRoute: ActivatedRoute, public toolbarService: ToolbarService) {
    this.router = router;
    activatedRoute.params.subscribe((parmas) => {
      if (parmas['id']) {
        this.toolbarService.loadTabs(this.navigation.find((tab: { url: any; }) => { return tab.url === parmas['id'] }).children)
      }
    })
  }

  ngOnInit(): void {
  }

  public async onNavigation(children: Array<any>) {
    this.router.navigateByUrl(children[0].url ?? this.navigation[0].url)
    this.toolbarService.tabsSubject.next(children)
  }
}
