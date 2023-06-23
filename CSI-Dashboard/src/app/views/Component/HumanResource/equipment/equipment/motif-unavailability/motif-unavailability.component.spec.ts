import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotifUnavailabilityComponent } from './motif-unavailability.component';

describe('MotifUnavailabilityComponent', () => {
  let component: MotifUnavailabilityComponent;
  let fixture: ComponentFixture<MotifUnavailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotifUnavailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotifUnavailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
