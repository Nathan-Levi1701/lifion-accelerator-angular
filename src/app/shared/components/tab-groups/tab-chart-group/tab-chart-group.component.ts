import { Component, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationChartComponent } from '../../organization-chart/organization-chart.component';
import { ChartService } from '~/services/chart.service';
import { DialogService } from '~/services/dialog.service';
import { ClientService } from '~/services/client.service';
import Client from '~/interfaces/Client.interface';
import { ExportService } from '~/services/export.service';
import { TitleCaseExtendedPipe } from '~/pipes/titlecase-extended.pipe';
import { EnterpriseNode } from '~/interfaces/Enterprise.interface';
import { DocumentReference } from 'firebase/firestore';

@Component({
  selector: 'tab-chart-group',
  templateUrl: './tab-chart-group.component.html',
  styleUrls: ['./tab-chart-group.component.scss']
})


export class TabChartGroupComponent implements OnInit, OnDestroy {
  @Input() chartGroups: Array<{ title: string, docId: string, chartData: Array<any> }> = [];
  @Input() tab: string = '';
  @Input() section: string = '';
  public selectedIndex: number = 0;
  public client: Client = {} as any;
  @ViewChildren('orgCharts') orgCharts?: QueryList<OrganizationChartComponent>;
  @ViewChild(OrganizationChartComponent, { static: false }) orgChart!: OrganizationChartComponent;

  constructor(public activatedRoute: ActivatedRoute, public chartService: ChartService, public dialogService: DialogService, public clientService: ClientService, public exportService: ExportService, public titlecaseExtended: TitleCaseExtendedPipe) {

  }

  public async addTab(event: PointerEvent) {
    event.stopPropagation();

    const response = await this.dialogService.openDialogAdd({ title: 'Add a name to the chart', client: this.client, tab: this.tab, section: this.section });
    if (response) {
      response.name = response.name.replaceAll(' ', '-').toLocaleLowerCase();
      const chartReference = await this.chartService.addChart(this.client, this.tab, this.section, response.name);
      if (chartReference.id) {
        const createdChart = await this.chartService.getChart(this.client.id!, this.tab, this.section, response.name, chartReference.id);
        if (createdChart) {
          this.chartGroups.push({ title: response.name, docId: response.docId, chartData: createdChart.data });
          this.selectedIndex = this.chartGroups.length - 1;
        }
      }
    }
  }

  ngOnInit() {
    this.clientService.clientObservable.subscribe((client: Client) => {
      this.client = client;
    })
  }

  public async onClear() {
    const response = await this.dialogService.openDialogConfirm({ title: 'Confirm Deletion', message: 'Are you sure you wish to clear this chart?' });

    if (response) {
      this.orgChart.orgChart.load(this.orgChart.nodes.filter((node: EnterpriseNode) => { return node.tags.includes('root') || node.tags.includes('subRoot') }));
    }
  }

  public async onCancel() {

  }

  public async onRename() {
    const response = await this.dialogService.openDialogAdd({ title: 'Rename Chart' });

    if (response) {
      const chartReference: DocumentReference = await this.chartService.addChart(this.client, this.tab, this.section, response.name);
      const deletedChart = await this.chartService.deleteChart(this.client.id!, this.tab, this.section, this.orgChart.subSection, this.orgChart.documentId);
      if (deletedChart) {
        const createdChart = await this.chartService.getChart(this.client.id!, this.tab, this.section, response.name, chartReference.id);
        if (createdChart) {
          this.chartGroups.splice(this.selectedIndex, 1, { title: createdChart.name, docId: createdChart.docId, chartData: createdChart.data })
        }
      }
    }
  }

  public async onExport() {
    const subSection = this.chartGroups[this.selectedIndex].title;
    this.exportService.exportChartData({ nodes: this.orgChart.nodes, tab: this.titlecaseExtended.transform(this.tab), section: this.titlecaseExtended.transform(this.section), subSection: this.titlecaseExtended.transform(subSection) });
  }

  public async onDelete() {
    const response = await this.dialogService.openDialogConfirm({ title: 'Confirm Deletion', message: 'Are you sure you wish to delete this chart?' });

    if (response) {
      const subSection = this.chartGroups[this.selectedIndex].title;
      const response = await this.chartService.deleteChart(this.client.id!, this.tab, this.section, subSection, this.orgChart.documentId);

      if (response) {
        this.chartGroups.splice(this.selectedIndex, 1);
        this.selectedIndex = --this.selectedIndex;
      }
    }
  }

  public async onSubmit() {
    const subSection = this.chartGroups[this.selectedIndex].title;
    const docId = this.chartGroups[this.selectedIndex].docId;
    const nodes = this.chartGroups[this.selectedIndex].chartData;


    console.log(subSection)
    console.log(docId)

    await this.chartService.updateChart(this.client.id!, this.tab, this.section, subSection, docId, nodes);
  }



  ngOnDestroy(): void {

  }
}
