import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePurchasedItemComponent } from './manage-purchased-item.component';

describe('ManagePurchasedItemComponent', () => {
  let component: ManagePurchasedItemComponent;
  let fixture: ComponentFixture<ManagePurchasedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePurchasedItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagePurchasedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
