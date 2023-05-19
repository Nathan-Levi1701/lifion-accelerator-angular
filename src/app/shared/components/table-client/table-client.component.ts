import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import Client from '~/interfaces/Client.interface';
import { ClientService } from '~/services/client.service';

@Component({
  selector: 'table-client',
  templateUrl: './table-client.component.html',
  styleUrls: ['./table-client.component.scss']
})

export class TableClientComponent implements OnInit, OnDestroy {
  constructor(public clientService: ClientService) { }

  public dataSource: MatTableDataSource<Client> = new MatTableDataSource();
  public nameControl = new FormControl();

  displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'onboard', 'actions'];

  async ngOnInit(): Promise<void> {
    this.dataSource.data = await this.clientService.getClients();

    this.nameControl.valueChanges.subscribe((value: string) => {
      this.dataSource.filter = value.trim();
    })
  }

  public async deleteClient(clientId: string) {
    const index = this.dataSource.data.findIndex((data) => { return data.id === clientId });
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = this.dataSource.data;
      await this.clientService.delete(clientId);
    }
  }

  ngOnDestroy(): void {

  }
}
