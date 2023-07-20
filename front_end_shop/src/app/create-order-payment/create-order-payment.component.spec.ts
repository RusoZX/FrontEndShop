import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderPaymentComponent } from './create-order-payment.component';

describe('CreateOrderPaymentComponent', () => {
  let component: CreateOrderPaymentComponent;
  let fixture: ComponentFixture<CreateOrderPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrderPaymentComponent]
    });
    fixture = TestBed.createComponent(CreateOrderPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
