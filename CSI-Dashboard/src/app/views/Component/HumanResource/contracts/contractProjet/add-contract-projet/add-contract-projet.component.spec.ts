import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractProjetComponent } from './add-contract-projet.component';

describe('AddContractProjetComponent', () => {
  let component: AddContractProjetComponent;
  let fixture: ComponentFixture<AddContractProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContractProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContractProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
