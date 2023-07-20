import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderAddressComponent } from './create-order-address.component';

describe('CreateOrderComponent', () => {
  let component: CreateOrderAddressComponent;
  let fixture: ComponentFixture<CreateOrderAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrderAddressComponent]
    });
    fixture = TestBed.createComponent(CreateOrderAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
