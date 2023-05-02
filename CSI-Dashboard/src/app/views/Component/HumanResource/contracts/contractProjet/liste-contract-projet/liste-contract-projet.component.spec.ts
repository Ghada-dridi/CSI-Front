import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeContractProjetComponent } from './liste-contract-projet.component';

describe('ListeContractProjetComponent', () => {
  let component: ListeContractProjetComponent;
  let fixture: ComponentFixture<ListeContractProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeContractProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeContractProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
