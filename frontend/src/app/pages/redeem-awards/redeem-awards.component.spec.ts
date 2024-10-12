import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemAwardsComponent } from './redeem-awards.component';

describe('RedeemAwardsComponent', () => {
  let component: RedeemAwardsComponent;
  let fixture: ComponentFixture<RedeemAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RedeemAwardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedeemAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
