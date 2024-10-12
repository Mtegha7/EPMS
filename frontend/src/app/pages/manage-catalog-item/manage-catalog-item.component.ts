import { Component } from '@angular/core';
import { catalogService } from '../../services/catalog/catalog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-catalog-item',
  templateUrl: './manage-catalog-item.component.html',
  styleUrl: './manage-catalog-item.component.scss'
})
export class ManageCatalogItemComponent {
  info: any;
  constructor(
    public catalog_service: catalogService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    console.log('we are in Manage Catalog Items')
    this.catalog_service.getCatalog()
  }


  view_catalog(data: any) {
    console.log(data)
    this.info = data;
    console.log('Stored info:', this.info);
  }

  update_catalog({ catalogID }: any) {
    this.router.navigate([`catalog/${catalogID}/edit`]);
  }

  delete_catalog_item({ catalogID }: any) {
    this.catalog_service.deleteCatalog(catalogID)
  }
}
