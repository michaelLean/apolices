import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/core/services/clients.service';

import Client from '../../core/models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  displayedColumns = ['name', 'cpf', 'city', 'uf', 'actions'];
  dataSource: MatTableDataSource<Client> = new MatTableDataSource();

  constructor(private router: Router, private clientsService: ClientsService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  public navigate(): void {
    this.router.navigateByUrl('/');
  }

  public edit(client: Client): void {
    this.router.navigateByUrl(`clients/${client.id}`);
  }

  public delete(client: Client): void {
    this.clientsService.delete(client).subscribe();
  }

  public addClient(): void {
    this.router.navigateByUrl('clients/new');
  }

  private loadClients(): void {
    this.clientsService.client$.subscribe((clients) => {
      this.dataSource = new MatTableDataSource(clients);
    });
  }
}
