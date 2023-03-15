import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BasicRadioComponent } from './basic-radio.component';

describe('BasicRadioComponent', () => {
  let component: BasicRadioComponent;
  let fixture: ComponentFixture<BasicRadioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
