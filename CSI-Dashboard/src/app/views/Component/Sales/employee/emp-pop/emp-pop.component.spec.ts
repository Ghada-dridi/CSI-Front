import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPopComponent } from './emp-pop.component';

describe('EmpPopComponent', () => {
  let component: EmpPopComponent;
  let fixture: ComponentFixture<EmpPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpPopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
