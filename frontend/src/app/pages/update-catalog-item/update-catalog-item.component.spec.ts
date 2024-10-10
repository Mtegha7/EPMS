import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCatalogItemComponent } from './update-catalog-item.component';

describe('UpdateCatalogItemComponent', () => {
  let component: UpdateCatalogItemComponent;
  let fixture: ComponentFixture<UpdateCatalogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCatalogItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCatalogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
