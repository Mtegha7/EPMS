import { Component } from '@angular/core';
import { catalogService } from '../../services/catalog/catalog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redeem-awards',
  templateUrl: './redeem-awards.component.html',
  styleUrl: './redeem-awards.component.scss'
})
export class RedeemAwardsComponent {

  info: any;

  constructor(
    public catalog_service: catalogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('we are in Redeem Awards')
    this.catalog_service.getCatalog()
  }

  add_request(data: any): void {
    console.log(data)
    this.info = data;
    if (this.info.taskID && this.info.userID) {
      const data = {
        userID: this.catalog_service.settings.userInformation.userID,
      };

      this.catalog_service.createRequest(data)
    }

  }

}
