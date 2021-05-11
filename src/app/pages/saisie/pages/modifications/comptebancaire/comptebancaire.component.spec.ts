import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptebancaireComponent } from './comptebancaire.component';

describe('ComptebancaireComponent', () => {
  let component: ComptebancaireComponent;
  let fixture: ComponentFixture<ComptebancaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComptebancaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptebancaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
