import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 } from 'uuid';
import { PolicyService } from 'src/app/core/services/policy.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {
  form: FormGroup = this.fb.group({
    id: [''],
    policyNumber: [v4(), [Validators.required]],
    lifeTimeStart: [null, [Validators.required]],
    lifeTimeEnd: [null, [Validators.required]],
    value: [0, [Validators.required]],
    vehicle: ['', [Validators.required, Validators.maxLength(7)]],
  });

  editing = false;

  constructor(
    private fb: FormBuilder,
    private policyService: PolicyService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const { id } = params;
      if (id) {
        this.loadPolicy(id);
      }
    });
  }

  public save(): void {
    const policy = this.form.value;
    policy.vehicle = policy.vehicle.toUpperCase();
    if (this.editing) {
      this.policyService.put(policy).subscribe();
      this.close();
      return;
    }
    this.policyService.post(policy).subscribe();
    this.close();
  }

  public close(): void {
    this.router.navigateByUrl('policies');
  }

  private loadPolicy(id: string): void {
    this.policyService.getById(id).subscribe((policy) => {
      this.editing = true;
      this.form.setValue(policy);
    });
  }
}
