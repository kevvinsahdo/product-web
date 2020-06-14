import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getAllProducts() {
    return this.httpClient.get(`${this.API_URL}/products`);
  }

  public createProduct(data: Object) {
    return this.httpClient.post(`${this.API_URL}/products`, data);
  }

  public editProduct(id: Number, data: Object) {
    return this.httpClient.put(`${this.API_URL}/products/${id}`, data);
  }

  public deleteProduct(id: Number) {
    return this.httpClient.delete(`${this.API_URL}/products/${id}`);
  }
}
