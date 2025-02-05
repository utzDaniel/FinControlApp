import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../core/item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private readonly API = 'http://localhost:8080/itens';

  constructor(readonly http: HttpClient) {}

  listar(): Observable<Item[]> {
    return this.http.get<Item[]>(this.API);
  }

  criar(item: Item): Observable<Item> {
    return this.http.post<Item>(this.API, item);
  }

  editar(item: Item): Observable<Item> {
    const url = `${this.API}/${item.id}`;
    return this.http.put<Item>(url, item);
  }

  excluir(id: number): Observable<Item> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Item>(url);
  }

  buscarPorId(id: number): Observable<Item> {
    const url = `${this.API}/${id}`;
    return this.http.get<Item>(url);
  }
}
