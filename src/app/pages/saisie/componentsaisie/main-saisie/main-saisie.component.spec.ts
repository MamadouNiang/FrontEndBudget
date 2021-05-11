import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSaisieComponent } from './main-saisie.component';

describe('MainSaisieComponent', () => {
  let component: MainSaisieComponent;
  let fixture: ComponentFixture<MainSaisieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSaisieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
