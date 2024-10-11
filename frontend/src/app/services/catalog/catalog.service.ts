import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { SettingsService } from '../settings/settings.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class catalogService {

  public catalog: any = []
  public catalogs: any = {};
  public catalogColumns: string[] = [];

  constructor(
    public http: HttpService,
    public settings: SettingsService,
    private router: Router
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

  getOneItem(catalogID: any) {
    this.settings.loader = true;
    this.http.getNoAuthorization(`catalog/get_item/${catalogID}`).subscribe((response: any) => {
      this.catalog = response['data']
      if (this.catalog.dateOfBirth) {
        this.catalog.dateOfBirth = new Date(this.catalog.dateOfBirth).toLocaleDateString('sv');
      }
      if (this.catalog.dateOfHire) {
        this.catalog.dateOfHire = new Date(this.catalog.dateOfHire).toLocaleDateString('sv');
      }
      console.log(this.catalog)
      console.log("this.catalogs", this.catalogs);
      this.settings.loader = false;

    })
  }

  updateItem() {
    this.settings.loader = true;
    this.http.update(`catalog/update_item/${this.catalog.catalogID}`, this.catalog).subscribe(
      (response: any) => {
        this.catalogs = this.catalogs.filter((catalog: { id: number; }) => catalog.id !== this.catalog.catalogIDs);
        console.log("Updated catalogues item", this.catalogs);
        alert("Item updated successfully!");
        this.settings.loader = false;
        this.router.navigateByUrl('manage_catalog_item')

      },
      (error: any) => {
        console.error('Error updating Item:', error);
        alert('Error occurred while updating the Item.');
        this.settings.loader = false;
      }
    );
  }
}