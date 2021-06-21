import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Policy from 'src/app/core/models/policy.model';
import { PolicyService } from 'src/app/core/services/policy.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss'],
})
export class PoliciesComponent implements OnInit {
  displayedColumns = [
    'policyNumber',
    'expireIn',
    'vehicle',
    'value',
    'actions',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  form = this.fb.group({
    policyNumber: [''],
  });

  constructor(
    private router: Router,
    private policiesService: PolicyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((policyNumber) => {
      this.dataSource.filter = policyNumber.trim();
    });
    this.loadPolicies();
  }

  public clients(): void {
    this.router.navigateByUrl('clients');
  }

  public edit(policy: Policy): void {
    this.router.navigateByUrl(`policies/${policy.id}`);
  }

  public delete(policy: Policy): void {
    this.policiesService.delete(policy).subscribe();
  }

  public addPolicy(): void {
    this.router.navigateByUrl('policies/new');
  }

  private loadPolicies(): void {
    this.policiesService.policy$.subscribe((policies) => {
      const mappedPolicies = policies.map((policy) => {
        const now = new Date();
        const lifeTimeEnd = new Date(policy.lifeTimeEnd);
        const expired = lifeTimeEnd < now;
        return {
          id: policy.id,
          policyNumber: policy.policyNumber,
          vehicle: policy.vehicle,
          value: policy.value,
          expired,
          expireIn: lifeTimeEnd,
        };
      });
      this.dataSource = new MatTableDataSource(mappedPolicies);
    });
  }
}
