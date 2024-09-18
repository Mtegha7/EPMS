import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})

export class catalogService {

  public catalog: any = []
  public catalogColumns: string[] = [];

  constructor(
    public http: HttpService
  ) { }


  getCatalog() {
    this.http.getNoAuthorization('catalog/get_catalog').subscribe((response: any) => {
      this.catalog = response['data']
      if (this.catalog) {
        this.catalogColumns = Object.keys(this.catalog[0]);
        console.log("this.catalogcolumns", this.catalogColumns);
      }
      console.log("this.catalog", this.catalog);
    })
  }
}