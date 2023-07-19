import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

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
    let url = `${this.cityUrl}/${county}`
    console.log(url)
    return this.httpClient.get(url);
  }
}
