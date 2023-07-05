import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MockProductsService {


  constructor(private httpClient: HttpClient) {}

  private urlProducts = 'http://localhost:8080/api/products';
  private urlCategories='http://localhost:8080/api/categories'

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(this.urlProducts);
  }

  getCategories(){
    return this.httpClient.get<any>(this.urlCategories);
  }

  getCategoryById(categoryId:any){
    const url=`${this.urlCategories}/${categoryId}`;
    return this.httpClient.get<any>(url);
  }

  saveProducts(product:any,categoryId:any):Observable<any>{
    let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4ODU2NTY5MSwiZXhwIjoxNjg4NTgzNjkxfQ.Q8Ep2VbGYRqu4pW_EQPvVsL-P4RM1rzq_OsxQ_lHZsM'
    let head_obj = new HttpHeaders().set('Authorization','bearer '+token)
    const url=`${this.urlProducts}/category/${categoryId}`
    return this.httpClient.post<any>(url,product,{headers:head_obj});
  }

  updateProduct(product:any,id:number):Observable<any>{
    const url = `${this.urlProducts}/${id}`;
    return this.httpClient.put<any>(url,product);
  }

  delete(id:number){
    const url = `${this.urlProducts}/${id}`;
    return this.httpClient.delete(url);
  }

  getToken(username: string, password: string): Observable<any> {
    const loginUrl = `http://localhost:8080/auth/login?username=${username}&password=${password}`;
    console.log(loginUrl)
    return this.httpClient.post<any>(loginUrl, {responseType:'text'});
  }
}
