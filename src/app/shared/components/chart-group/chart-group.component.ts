import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationChartComponent } from '../organization-chart/organization-chart.component';
import { MatTabGroup } from '@angular/material/tabs';
import { ChartService } from '~/services/chart.service';
import { DialogService } from '~/services/dialog.service';
import { ClientService } from '~/services/client.service';
import Client from '~/interfaces/Client.interface';

@Component({
  selector: 'chart-group',
  templateUrl: './chart-group.component.html',
  styleUrls: ['./chart-group.component.scss']
})


export class ChartGroupComponent implements OnInit, OnDestroy {
  @Input() chartGroups: Array<{ title: string, docId: string, chartData: Array<any> }> = [];
  @Input() tab: string = '';
  @Input() section: string = '';
  public selectedIndex: number = 0;
  public client: Client = {} as any;
  @ViewChildren('chartInstances') chartInstances?: QueryList<OrganizationChartComponent>;
  @ViewChildren(MatTabGroup) matTabGroup?: QueryList<MatTabGroup>;

  constructor(public activatedRoute: ActivatedRoute, public chartService: ChartService, public dialogService: DialogService, public clientService: ClientService) {
    this.clientService.clientObservable.subscribe((client: Client) => {
      this.client = client;
    })
  }

  public async addTab(event: PointerEvent) {
    event.stopPropagation();

    const response = await this.dialogService.openDialogAdd({ title: 'Add a name to the chart', client: this.client, tab: this.tab, section: this.section });
    if (response) {
      const createdChart = await this.chartService.getChart(this.client.id!, this.tab, this.section, response.name, response.docId);
      this.chartGroups.push({ title: response.name, docId: response.docId, chartData: createdChart.data });
      this.selectedIndex = this.chartGroups.length - 1;
    }
  }

  ngOnInit() {

  }

  public async onClear() {
    const response = await this.dialogService.openDialogConfirm({ title: 'Confirm Deletion', message: 'Are you sure you wish to clear this chart?' });

    if (response) {
      const currentOrgChart = this.chartInstances?.get(this.selectedIndex) as any;
      currentOrgChart.nodes = [];
      currentOrgChart.orgChart.load([]);
    }
  }

  public async onCancel() {

  }

  public async onDelete() {
    const response = await this.dialogService.openDialogConfirm({ title: 'Confirm Deletion', message: 'Are you sure you wish to delete this chart?' });

    if (response) {
      const subSection = this.chartGroups[this.selectedIndex].title;
      const docId = this.chartInstances?.get(this.selectedIndex)?.documentId!;

      const response = await this.chartService.deleteChart(this.client.id!, this.tab, this.section, subSection, docId);

      if (response) {
        this.chartGroups.splice(this.selectedIndex, 1);
        this.selectedIndex = --this.selectedIndex;
      }
    }
  }

  public async onSubmit() {
    const subSection = this.chartGroups[this.selectedIndex].title;
    const docId = this.chartInstances?.get(this.selectedIndex)?.documentId!;
    const nodes = this.chartInstances?.get(this.selectedIndex)?.nodes;

    await this.chartService.updateChart(this.client.id!, this.tab, this.section, subSection, docId, nodes);
  }



  ngOnDestroy(): void {

  }
}
