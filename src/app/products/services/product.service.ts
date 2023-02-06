import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }
  // get All Products
  getAllProducts() {
   return this.httpClient.get(`${environment.apiUrl}products`)
  }
  // Add Product 
  addProduct(model: product) {
    return this.httpClient.post(`${environment.apiUrl}products`,model)
  }  
  // update Product
  updateProductByID(id: number, model: product) {
    return this.httpClient.put(`${environment.apiUrl}products/${id}`,model)
  }
  // get Product By ID
  getProductByID(id: number) {
    return this.httpClient.get(`${environment.apiUrl}products?id=${id}`)
  }
  
  //  delete Product By ID
  deleteProductByID(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}products/${id}`)
  }

 
}
