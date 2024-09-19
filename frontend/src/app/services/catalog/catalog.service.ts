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

  deleteCatalog(catalogID: any) {
    this.http.delete(`catalog/delete_catalog_item/${catalogID}`).subscribe(
      (response: any) => {
        this.catalog = this.catalog.filter((catalog: { id: number; }) => catalog.id !== catalogID);

        if (this.catalog.length > 0) {
          this.catalogColumns = Object.keys(this.catalog[0]);
          console.log("this.catalogColumns", this.catalogColumns);
        }
        console.log("Updated Items list", this.catalog);
        alert("Item deleted successfully!");
      },
      (error: any) => {
        console.error('Error deleting Item:', error);
        alert('Error occurred while deleting the Item.');
      }
    );
  }
}