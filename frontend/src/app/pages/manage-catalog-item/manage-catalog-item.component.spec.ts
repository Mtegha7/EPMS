import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCatalogItemComponent } from './manage-catalog-item.component';

describe('ManageCatalogItemComponent', () => {
  let component: ManageCatalogItemComponent;
  let fixture: ComponentFixture<ManageCatalogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageCatalogItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageCatalogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
