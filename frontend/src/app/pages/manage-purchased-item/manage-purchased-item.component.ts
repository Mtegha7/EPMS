import { Component } from '@angular/core';
import { catalogService } from '../../services/catalog/catalog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-purchased-item',
  templateUrl: './manage-purchased-item.component.html',
  styleUrl: './manage-purchased-item.component.scss'
})
export class ManagePurchasedItemComponent {
  info: any;
  constructor(
    public catalog_service: catalogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('we are in Manage purchased Items')
    this.catalog_service.getRequests()
  }
}
