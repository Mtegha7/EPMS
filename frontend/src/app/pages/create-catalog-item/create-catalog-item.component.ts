import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-create-catalog-item',
  templateUrl: './create-catalog-item.component.html',
  styleUrl: './create-catalog-item.component.scss'
})
export class CreateCatalogItemComponent {
  createCatalogForm!: FormGroup;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.createCatalogForm = this.createFormGroup();
  }

  get f() { return this.createCatalogForm.controls; }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      requiredPoints: new FormControl("", [Validators.required]),
    });
  }

  add_catalog(): void {
    this.authService.create_catalog(this.createCatalogForm.value)
    // .subscribe();
  }
}
