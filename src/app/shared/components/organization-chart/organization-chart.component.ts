import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import OrgChart from '@balkangraph/orgchart.js';
import { EnterpriseNode } from '~/interfaces/Enterprise.interface';
import { DialogService } from '~/services/dialog.service';
import { FeedbackService } from '~/services/feedback.service';
import { FormService } from '~/services/form.service';

@Component({
  selector: 'organization-chart',
  templateUrl: './organization-chart.component.html',
  styleUrls: ['./organization-chart.component.scss']
})
export class OrganizationChartComponent implements OnInit, OnChanges {
  @Input() tab: string = '';
  @Input() section: string = '';
  @Input() subSection: string = '';
  @Input() clientId: string = '';
  @Input() documentId: string = '';
  @Input() nodes: Array<EnterpriseNode> = [];

  public orgChart: OrgChart = {} as any;
  private nodeBinding = {
    field_0: "code",
    field_1: "name",
    field_2: 'role'
  };

  public roles = [
    { value: "area", text: "Area" },
    { value: "branch", text: "Branch" },
    { value: "brand", text: "Brand" },
    { value: "businessUnit", text: "Business Unit" },
    { value: "client", text: "Client" },
    { value: "department", text: "Department" },
    { value: "departmentGroup", text: "Department Group" },
    { value: "district", text: "District" },
    { value: "division", text: "Division" },
    { value: "group", text: "Group" },
    { value: "homeDepartment", text: "Home Department" },
    { value: "lineOfBusiness", text: "Line of Business" },
    { value: "market", text: "Market" },
    { value: "practice", text: "Practice" },
    { value: "program", text: "Program" },
    { value: "region", text: "Region" },
    { value: "sector", text: "Sector" },
    { value: "segment", text: "Segment" },
    { value: "subDept", text: "Sub Dept" },
    { value: "subGroup", text: "Sub Group" },
    { value: "tier", text: "Tier" },
    { value: "workUnit", text: "Work Unit" },
    { value: "zone", text: "Zone" },
  ]

  constructor(public activatedRoute: ActivatedRoute, public dialogService: DialogService, public formService: FormService, public feedbackService: FeedbackService) {
    // Setting Default Template
    OrgChart.templates['defaultTemplate'] = Object.assign({}, OrgChart.templates['ana']);
    OrgChart.templates['defaultTemplate'].editFormHeaderColor = '#0d6efd';
    OrgChart.templates['defaultTemplate'].size = [200, 100];
    OrgChart.templates['defaultTemplate'].nodeMenuButton =
      `<g style="cursor:pointer;" transform="matrix(1,0,0,1,180,45)" data-ctrl-n-menu-id="{id}">
    <rect x="-11" y="-4" fill="#000000" fill-opacity="0" width="22" height="22"></rect>
    <circle cx="0" cy="0" r="2" fill="#ffffff"></circle>
    <circle cx="0" cy="7" r="2" fill="#ffffff"></circle>
    <circle cx="0" cy="14" r="2" fill="#ffffff"></circle>
    </g>`;
    OrgChart.SEARCH_PLACEHOLDER = 'Search by Code, Name or Role'
    OrgChart.templates['defaultTemplate'].ripple = { radius: 0, color: "none", rect: undefined };
    OrgChart.templates['defaultTemplate']['field_0'] = '<text data-width="200" class="field_0" style="font-size: 12px;" fill="#ffffff" x="100" y="30" text-anchor="middle">{val}</text>';
    OrgChart.templates['defaultTemplate']['field_1'] = '<text data-width="200" class="field_1" style="font-size: 16px; font-weight: 600" fill="#ffffff" x="100" y="55" text-anchor="middle">{val}</text>';
    OrgChart.templates['defaultTemplate']['field_2'] = '<text data-width="200" class="field_2" style="font-size: 16px;" fill="#ffffff" x="100" y="80" text-anchor="middle">{val}</text>';


    OrgChart.IT_IS_LONELY_HERE = '';
    // OrgChart.templates['defaultTemplate.ripple = { radius: 0, color: "none", rect: undefined };
    OrgChart.templates['defaultTemplate'].node = '<rect x="0" y="0" height="100" width="200" fill="#0d6efd" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Root Template
    OrgChart.templates['root'] = Object.assign({}, OrgChart.templates['defaultTemplate'])
    OrgChart.templates['root'].node = '<rect x="0" y="0" height="100" width="200" fill="#aeaeae" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Sub Root Template
    OrgChart.templates['subRoot'] = Object.assign({}, OrgChart.templates['root']);
    OrgChart.templates['subRoot'].node = '<rect x="0" y="0" height="100" width="200" fill="#aeaeae" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Area Template
    OrgChart.templates['area'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['area'].node = '<rect x="0" y="0" height="100" width="200" fill="#D50000" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Branch Template
    OrgChart.templates['branch'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['branch'].node = '<rect x="0" y="0" height="100" width="200" fill="#C51162" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Brand Template
    OrgChart.templates['brand'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['brand'].node = '<rect x="0" y="0" height="100" width="200" fill="#006064" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Businesss Unit Template
    OrgChart.templates['businessUnit'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['businessUnit'].node = '<rect x="0" y="0" height="100" width="200" fill="#AA00FF" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Client Template
    OrgChart.templates['client'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['client'].node = '<rect x="0" y="0" height="100" width="200" fill="#6200EA" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Department Template
    OrgChart.templates['department'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['department'].node = '<rect x="0" y="0" height="100" width="200" fill="#2962FF" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Department Group Template
    OrgChart.templates['departmentGroup'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['departmentGroup'].node = '<rect x="0" y="0" height="100" width="200" fill="#0091EA" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // District Template
    OrgChart.templates['district'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['district'].node = '<rect x="0" y="0" height="100" width="200" fill="#00B8D4" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Division Template
    OrgChart.templates['division'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['division'].node = '<rect x="0" y="0" height="100" width="200" fill="#1B5E20" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Group Template
    OrgChart.templates['group'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['group'].node = '<rect x="0" y="0" height="100" width="200" fill="#00BFA5" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Home Department Template
    OrgChart.templates['homeDepartment'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['homeDepartment'].node = '<rect x="0" y="0" height="100" width="200" fill="#00C853" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Line of Business Template
    OrgChart.templates['lineOfBusiness'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['lineOfBusiness'].node = '<rect x="0" y="0" height="100" width="200" fill="#64DD17" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Market Template
    OrgChart.templates['market'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['market'].node = '<rect x="0" y="0" height="100" width="200" fill="#AEEA00" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Practice Template
    OrgChart.templates['practice'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['practice'].node = '<rect x="0" y="0" height="100" width="200" fill="#FFAB00" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Program Template
    OrgChart.templates['program'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['program'].node = '<rect x="0" y="0" height="100" width="200" fill="#FFD600" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Region Template
    OrgChart.templates['region'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['region'].node = '<rect x="0" y="0" height="100" width="200" fill="#FF6D00" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Sector Template
    OrgChart.templates['sector'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['sector'].node = '<rect x="0" y="0" height="100" width="200" fill="#5D4037" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Segment Template
    OrgChart.templates['segment'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['segment'].node = '<rect x="0" y="0" height="100" width="200" fill="#263238" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Sub Dept Template
    OrgChart.templates['subDept'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['subDept'].node = '<rect x="0" y="0" height="100" width="200" fill="#9E9D24" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Sub Group Template
    OrgChart.templates['subGroup'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['subGroup'].node = '<rect x="0" y="0" height="100" width="200" fill="#616161" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Tier Template
    OrgChart.templates['tier'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['tier'].node = '<rect x="0" y="0" height="100" width="200" fill="#EC407A" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Work Unit Template
    OrgChart.templates['workUnit'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['workUnit'].node = '<rect x="0" y="0" height="100" width="200" fill="#F48FB1" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';

    // Zone Template
    OrgChart.templates['zone'] = Object.assign({}, OrgChart.templates['defaultTemplate']);
    OrgChart.templates['zone'].node = '<rect x="0" y="0" height="100" width="200" fill="#CE93D8" stroke-width="1" stroke="#aeaeae" rx="7" ry="7"></rect>';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nodes'] && changes['nodes'].currentValue.length > 0) {
      this.nodes = changes['nodes'].currentValue;
      this.orgChart.load(this.nodes);
    }

    if (changes['documentId']) {
      this.documentId = changes['documentId'].currentValue;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      this.clientId = params['clientId'];
      this.tab = params['tab'];
      this.section = params['section'];
    });

    this.orgChart = new OrgChart('#chart', {
      nodeBinding: this.nodeBinding,
      template: 'root',
      enableDragDrop: true,
      nodes: this.nodes,
      enableSearch: false,
      nodeMenu: {
        add: { text: "Add Node", onClick: (nodeId: string) => { this.addNode(nodeId) } },
        edit: { text: "Edit Node", onClick: (nodeId: string) => { this.editNode(nodeId) } },
        remove: { text: "Delete Node", onClick: (nodeId: string) => { this.deleteNode(nodeId) } },
      },
      tags: {
        area: { template: 'area' },
        branch: { template: 'branch' },
        brand: { template: 'brand' },
        businessUnit: { template: 'businessUnit', },
        client: { template: 'client' },
        department: { template: 'department' },
        departmentGroup: { template: 'departmentGroup' },
        district: { template: 'district' },
        division: { template: 'division' },
        group: { template: 'group' },
        homeDepartment: { template: 'homeDepartment' },
        lineOfBusiness: { template: 'lineOfBusiness' },
        market: { template: 'market' },
        practice: { template: 'practice' },
        program: { template: 'program' },
        region: { template: 'region' },
        root: {
          template: 'root',
          nodeMenu: {
            add: { text: 'Add Sub Structure', onClick: (nodeId: string) => { this.addSubRootNode(nodeId) } },
            edit: { text: "Edit Node", onClick: (nodeId: string) => { this.editNode(nodeId) } },
            remove: { text: "Delete Node", onClick: (nodeId: string) => { this.deleteNode(nodeId) } },
          }
        },
        sector: { template: 'sector' },
        segment: { template: 'segment' },
        subDept: { template: 'subDept' },
        subGroup: { template: 'subGroup' },
        subRoot: {
          template: 'subRoot',
          nodeMenu: {
            add: { text: "Add Node", onClick: (nodeId: string) => { this.addNode(nodeId) } },
            edit: { text: "Edit Node", onClick: (nodeId: string) => { this.editNode(nodeId) } },
            remove: { text: "Delete Node", onClick: (nodeId: string) => { this.deleteNode(nodeId) } },
          }
        },
        tier: { template: 'tier' },
        workUnit: { template: 'workUnit' },
        zone: { template: 'zone' },
      },
    })

    this.orgChart.on('click', (_sender: OrgChart) => {
      return false;
    })
  }

  public async addRootNode() {
    const node = {
      id: OrgChart.randomId(),
      name: '',
      code: 'EU-0',
      reportsToCode: '',
      role: 'Root',
      parentStructure: 'Enterprise Structure',
      childStructure: 'Enterprise Substructure 13',
      relationship: 'partOf',
      tags: ['root'],
    }

    const response = await this.dialogService.openDialogChart({ title: 'Add Root Structure', nodeType: 'root', roles: [{ value: 'root', text: 'Root' }], node, nodes: this.nodes });

    if (response) {
      this.orgChart.addNode(response)
    }
  }

  public async addSubRootNode(nodeId: string) {
    const node = {
      id: OrgChart.randomId(),
      pid: nodeId,
      name: '',
      code: 'EU-13',
      reportsToCode: this.nodes.find((n) => { return n.id === nodeId })?.code,
      role: 'Root',
      parentStructure: this.nodes.find((n) => { return n.id === nodeId })?.childStructure,
      childStructure: this.nodes.find((n) => { return n.id === nodeId })?.childStructure,
      relationship: 'partOf',
      tags: ['subRoot'],
    }

    const response = await this.dialogService.openDialogChart({ title: 'Add Sub Structure', nodeType: 'subRoot', roles: [{ value: 'subRoot', text: 'Root' }], node, nodes: this.nodes });

    if (response) {
      this.orgChart.addNode(response)
    }
  }

  public async addNode(nodeId: string) {
    const node = {
      id: OrgChart.randomId(),
      pid: nodeId,
      code: '',
      reportsToCode: this.nodes.find((n) => { return n.id === nodeId })?.code,
      name: '',
      role: 'Area',
      relationship: 'partOf',
      parentStructure: this.nodes.find((n) => { return n.id === nodeId })?.childStructure,
      childStructure: this.nodes.find((n) => { return n.id === nodeId })?.childStructure,
      tags: ['area']
    }

    const response = await this.dialogService.openDialogChart({ title: 'Add Role', nodeType: null, roles: this.roles, node, nodes: this.nodes });

    if (response) {
      this.orgChart.addNode(response)
    }

    console.log(this.nodes)
  }

  public async editNode(nodeId: string) {
    const node = this.nodes.find((node) => { return node.id === nodeId });

    let roles: Array<{ value: string, text: string }> = this.roles;

    if (node?.tags.includes('root')) {
      roles = [{ value: 'root', text: 'Root' }]
    }

    if (node?.tags.includes('subRoot')) {
      roles = [{ value: 'subRoot', text: 'Root' }]
    }

    const response = await this.dialogService.openDialogChart({ title: 'Edit Node', nodeType: node?.tags.join(''), roles: roles, node, nodes: this.nodes });

    if (response) {
      this.orgChart.updateNode(response)
    }
  }

  public async deleteNode(nodeId: string) {
    const response = await this.dialogService.openDialogConfirm({ title: 'Confirm Deletion', message: 'Are you sure you wish to delete this node?' });

    if (response) {
      this.orgChart.removeNode(nodeId);
    }
  }

  public async onClear() {
    const response = await this.dialogService.openDialogConfirm({ title: 'Confirm Deletion', message: 'Are you sure you wish to clear this chart?' });

    if (response) {
      this.nodes = [];
      this.orgChart.load([]);
    }
  }

  public async onCancel() {

  }

  public async onSubmit() {
    await this.formService.updateForm(this.clientId, this.tab, this.section, 'organization-chart', this.documentId, this.nodes);
    this.formService.formSubject.next({ type: 'chart', tab: this.tab, section: this.section, subSection: 'organization-chart', docId: this.documentId, data: this.nodes });
  }
}
