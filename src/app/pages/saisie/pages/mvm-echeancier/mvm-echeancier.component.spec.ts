import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvmEcheancierComponent } from './mvm-echeancier.component';

describe('MvmEcheancierComponent', () => {
  let component: MvmEcheancierComponent;
  let fixture: ComponentFixture<MvmEcheancierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvmEcheancierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvmEcheancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
