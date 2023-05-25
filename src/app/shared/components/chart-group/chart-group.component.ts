import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '~/services/client.service';
import { FormService } from '~/services/form.service';
import { ToolbarService } from '~/services/toolbar.service';
import { OrganizationChartComponent } from '../organization-chart/organization-chart.component';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'chart-group',
  templateUrl: './chart-group.component.html',
  styleUrls: ['./chart-group.component.scss']
})


export class ChartGroupComponent implements OnDestroy {
  @Input() chartGroups: Array<{ title: string, docId: string, chartData: Array<any> }> = [];
  @Input() selectedIndex: number = 0;
  @Input() tab: string = '';
  @Input() section: string = '';
  @Input() subSection: string = '';
  @Input() clientId: string = '';
  @ViewChildren('chartInstances') chartInstances?: QueryList<OrganizationChartComponent>;
  @ViewChildren(MatTabGroup) matTabGroup?: QueryList<MatTabGroup>;

  constructor(public activatedRoute: ActivatedRoute, public toolbarService: ToolbarService, public formService: FormService, public fb: FormBuilder, public clientService: ClientService) {
  }

  public addTab(event: PointerEvent) {
    event.stopPropagation();
    this.chartGroups.push({ title: 'New Chart', docId: '', chartData: [] });
    this.selectedIndex = this.chartGroups.length - 1;
    console.log(this.chartInstances)
  }

  ngOnInit() {

  }


  public onBack() {
    this.selectedIndex = --this.selectedIndex;
  }

  async onSubmit() {


  }

  onReset() {

  }

  ngOnDestroy(): void {

  }
}
