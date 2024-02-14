import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BASE_URL_API } from 'src/app/settings';
import { UserAddress } from 'src/app/models/user-address.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdressServiceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  countyUrl = 'https://roloca.coldfuse.io/judete';
  cityUrl = 'https://roloca.coldfuse.io/orase';

  getCounties() {
    return this.httpClient.get(this.countyUrl);
  }

  getCities(county: string) {
    let url = `${this.cityUrl}/${county}`;
    return this.httpClient.get(url);
  }

  setAddress(address: UserAddress) {
    const url = `${BASE_URL_API}/addresses`;
    return this.httpClient.post(url, address, { responseType: 'text' }).subscribe();
  }

  getUserAddresses(userId: number): Observable<any> {
    const url = `${BASE_URL_API}/addresses/user/${userId}`;
    return this.httpClient.get<any>(url);
  }

  updateAddress(id: number, address: UserAddress) {
    const url = `${BASE_URL_API}/addresses/${id}`;
    return this.httpClient.put(url, address, { responseType: 'text' });
  }

  deleteAddress(id: number) {
    const url = `${BASE_URL_API}/addresses/${id}`;
    return this.httpClient.delete(url, { responseType: 'text' });
  }
}
