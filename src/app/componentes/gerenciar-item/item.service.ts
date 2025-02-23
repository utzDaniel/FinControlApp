import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../core/item';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Paginacao } from '../../core/paginacao';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private readonly API = 'http://localhost:8080/itens';

  constructor(readonly http: HttpClient) {}

  listar(
    paginaAtual: number,
    itensPorPagina: number,
    valor: string
  ): Observable<Paginacao<Item>> {
    let params = new HttpParams()
      .set('paginaAtual', paginaAtual)
      .set('itensPorPagina', itensPorPagina);
    if (valor) {
      params = params.append('valor', valor);
    }
    return this.http.get<Paginacao<Item>>(this.API, { params: params });
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
