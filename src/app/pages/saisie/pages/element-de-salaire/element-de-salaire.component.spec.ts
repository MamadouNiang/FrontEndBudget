import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementDeSalaireComponent } from './element-de-salaire.component';

describe('ElementDeSalaireComponent', () => {
  let component: ElementDeSalaireComponent;
  let fixture: ComponentFixture<ElementDeSalaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementDeSalaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementDeSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
