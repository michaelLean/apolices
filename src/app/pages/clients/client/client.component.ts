import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/core/services/clients.service';
import { cpfValidator } from 'src/app/shared/validators/cpf.validator';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  form: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    cpf: ['', [Validators.required, cpfValidator()]],
    city: ['', [Validators.required]],
    uf: ['', [Validators.required]],
  });

  editing = false;

  ufs = [
    'AC',
    'AL',
    'AM',
    'AP',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MG',
    'MS',
    'MT',
    'PA',
    'PB',
    'PE',
    'PI',
    'RN',
    'PR',
    'RJ',
    'RO',
    'RR',
    'RS',
    'SC',
    'SE',
    'SP',
    'TO',
  ];

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const { id } = params;
      if (id) {
        this.loadClient(id);
      }
    });
  }

  public save(): void {
    const client = this.form.value;
    if (this.editing) {
      this.clientsService.put(client).subscribe();
      this.close();
      return;
    }
    this.clientsService.post(client).subscribe();
    this.close();
  }

  public close(): void {
    this.router.navigateByUrl('clients');
  }

  private loadClient(id: string): void {
    this.clientsService.getById(id).subscribe((client) => {
      this.editing = true;
      this.form.setValue(client);
    });
  }
}
