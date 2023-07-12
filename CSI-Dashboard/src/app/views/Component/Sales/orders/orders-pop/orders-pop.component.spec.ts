import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPopComponent } from './orders-pop.component';

describe('OrdersPopComponent', () => {
  let component: OrdersPopComponent;
  let fixture: ComponentFixture<OrdersPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersPopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
