import { Component } from '@angular/core';
import { catalogService } from '../../services/catalog/catalog.service';

@Component({
  selector: 'app-manage-catalog-item',
  templateUrl: './manage-catalog-item.component.html',
  styleUrl: './manage-catalog-item.component.scss'
})
export class ManageCatalogItemComponent {
  info: any = {};
  constructor(public catalog_service: catalogService) {

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

  delete_catalog_item({ catalogID }: any) {
    this.catalog_service.deleteCatalog(catalogID)
  }
}
