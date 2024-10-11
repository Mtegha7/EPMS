import { Component } from '@angular/core';
import { catalogService } from '../../services/catalog/catalog.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-catalog-item',
  templateUrl: './update-catalog-item.component.html',
  styleUrl: './update-catalog-item.component.scss'
})
export class UpdateCatalogItemComponent {
  catalogID: any;

  isLoading: boolean = false;
  loadingTitle: string = '';
  errors: any = [];


  constructor(
    public catalog_service: catalogService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.catalogID = this.route.snapshot.paramMap.get(`id`);

    this.catalog_service.getOneItem(this.catalogID)
  }

  update_tasks(): void {

  }
}
