import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Policy from '../models/policy.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private readonly url = 'http://localhost:3000/policies';
  private _policies$: BehaviorSubject<Policy[]> = new BehaviorSubject<Policy[]>(
    []
  );

  get policy$(): Observable<Policy[]> {
    return this._policies$.asObservable();
  }
  constructor(private httpClient: HttpClient) {
    this.loadPolicies();
  }

  private loadPolicies(): void {
    this.httpClient.get<Policy[]>(this.url).subscribe((policies) => {
      this._policies$.next(policies);
    });
  }

  public getById(id: string): Observable<Policy> {
    return this.httpClient.get<Policy>(`${this.url}/${id}`);
  }

  public post(policy: Policy): Observable<void> {
    return this.httpClient.post<Policy>(`${this.url}`, policy).pipe(
      map((newPolicy) => {
        const policies = this._policies$.value;
        policies.push(newPolicy);
        this._policies$.next(policies);
      })
    );
  }

  public put(policy: Policy): Observable<void> {
    const { id } = policy;
    return this.httpClient.put<Policy>(`${this.url}/${id}`, policy).pipe(
      map(() => {
        const policies = this._policies$.value.map((policyMap) => {
          if (policyMap.id === id) {
            return policy;
          }
          return policyMap;
        });
        this._policies$.next(policies);
      })
    );
  }

  public delete(policy: Policy): Observable<void> {
    const { id } = policy;
    return this.httpClient.delete<Policy>(`${this.url}/${id}`).pipe(
      map(() => {
        const policies = this._policies$.value;
        const policyIndex = policies.findIndex(
          (policyFind) => policyFind.id === id
        );
        policies.splice(policyIndex, 1);
        this._policies$.next(policies);
      })
    );
  }
}
