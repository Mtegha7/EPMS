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
  public request: any = []
  public requests: any = {};
  public requestColumns: string[] = [];

  constructor(
    public http: HttpService,
    public settings: SettingsService,
    private router: Router
  ) { }

  // get catalog items
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

  // delete catalog items
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

  // get a specific catalog item
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

  // update a particular item
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

  // get redemption requests
  getRequests() {
    this.settings.loader = true;
    this.http.getNoAuthorization('catalog/get_requests').subscribe((response: any) => {
      this.requests = response['data']
      if (this.requests) {
        this.requestColumns = Object.keys(this.requests[0]);
        console.log("this.requestcolumns", this.requestColumns);
      }
      console.log("this.request", this.request);
      this.settings.loader = false;
    })
  }

  // add a request
  createRequest(data: any) {
    this.http.post('catalog/add_request', data).subscribe((response: any) => {
      try {
        // this.router.navigate(["manage_catalog_item"]);
        alert(response.message)
      } catch (error) {
        alert('ERROR Setting request data' + error)

      }
    }, (error) => {
      if (error.error.message) {
        alert(error.error.message);
      } else {
        alert("Server Error. please retry or check network");
      }

    });
  }

  // approve request and deduct points 
  approveRequest(requestID: number, index: any) {
    this.settings.loader = true;
    this.http.update(`catalog/approve_request`, requestID).subscribe(
      (response: any) => {
        console.log("Request approved successfully:", response.message);
        this.requests[index].redemed = 1
        alert("Request approved successfully!");
        this.settings.loader = false;
      },
      (error: any) => {
        console.error('Error approving request:', error);
        alert('An error occurred while approving the request.');
        this.settings.loader = false;
      }
    );
  }


}