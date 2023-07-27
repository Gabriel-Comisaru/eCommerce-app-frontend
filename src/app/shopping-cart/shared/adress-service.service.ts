import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BASE_URL_API } from 'src/app/settings';

@Injectable({
  providedIn: 'root'
})
export class AdressServiceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  countyUrl = 'https://roloca.coldfuse.io/judete';
  cityUrl = 'https://roloca.coldfuse.io/orase';
  private url = `${BASE_URL_API}`;
  getCounties() {
    return this.httpClient.get(this.countyUrl);
  }

  getCities(county: string) {
    let url = `${this.cityUrl}/${county}`
    console.log(url)
    return this.httpClient.get(url);
  }

  postAddress(form: any) {
    let url = `${this.url}/addresses`;
    return this.httpClient.post(url, form);
  }
}
