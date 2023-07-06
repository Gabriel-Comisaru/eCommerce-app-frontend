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
    // let token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4ODY1MDgxOCwiZXhwIjoxNjg4NjY4ODE4fQ.jo81d4dXMoQM1ngtpmeTq8TQwVPaGR0BXLIQr4nbOi8'
    // let head_obj = new HttpHeaders().set('Authorization',token)
    //   .set('Access-Control-Allow-Origin','http://localhost:4200')
    //
    //  console.log(head_obj)
    return this.httpClient.get<any>(this.urlProducts+'/lazy');
  }

  getCategories(){
    return this.httpClient.get<any>(this.urlCategories);
  }

  getCategoryById(categoryId:any){
    const url=`${this.urlCategories}/${categoryId}`;
    return this.httpClient.get<any>(url);
  }

  saveProducts(product:any,categoryId:any,token:any):Observable<any>{
    let head_obj = new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept','*/*')
    const url=`${this.urlProducts}/category/${categoryId}`
    return this.httpClient.post<any>(url,product,{headers:head_obj});

  }

  updateProduct(product:any,id:number):Observable<any>{
    const url = `${this.urlProducts}/${id}`;
    return this.httpClient.put<any>(url,product);
  }

  delete(id:number,token:any){
    console.log(token)
    let head_obj = new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type', 'application/json')
    const url = `${this.urlProducts}/${id}`;
    return this.httpClient.delete(url,{headers:head_obj});
  }

  getToken(username: string, password: string): Observable<any> {
    const loginUrl = `http://localhost:8080/auth/login?username=${username}&password=${password}`;
    console.log(loginUrl)
    return this.httpClient.post<any>(loginUrl, {responseType:'text'});
  }
}
