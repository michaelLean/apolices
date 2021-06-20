import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Client from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly url = 'http://localhost:3000/clients';
  private _clients$: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>(
    []
  );

  get client$(): Observable<Client[]> {
    return this._clients$.asObservable();
  }
  constructor(private httpClient: HttpClient) {
    this.loadClients();
  }

  private loadClients(): void {
    this.httpClient.get<Client[]>(this.url).subscribe((clients) => {
      this._clients$.next(clients);
    });
  }

  public getById(id: string): Observable<Client> {
    return this.httpClient.get<Client>(`${this.url}/${id}`);
  }

  public post(client: Client): Observable<void> {
    return this.httpClient.post<Client>(`${this.url}`, client).pipe(
      map((newClient) => {
        const clients = this._clients$.value;
        clients.push(newClient);
        this._clients$.next(clients);
      })
    );
  }

  public put(client: Client): Observable<void> {
    const { id } = client;
    return this.httpClient.put<Client>(`${this.url}/${id}`, client).pipe(
      map(() => {
        const clients = this._clients$.value.map((clientMap) => {
          if (clientMap.id === id) {
            return client;
          }
          return clientMap;
        });
        this._clients$.next(clients);
      })
    );
  }

  public delete(client: Client): Observable<void> {
    const { id } = client;
    return this.httpClient.delete<Client>(`${this.url}/${id}`).pipe(
      map(() => {
        const clients = this._clients$.value;
        const clientIndex = clients.findIndex(
          (clientFind) => clientFind.id === id
        );
        clients.splice(clientIndex, 1);
        this._clients$.next(clients);
      })
    );
  }
}
