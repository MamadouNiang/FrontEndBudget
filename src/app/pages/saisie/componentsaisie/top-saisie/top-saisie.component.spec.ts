import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSaisieComponent } from './top-saisie.component';

describe('TopSaisieComponent', () => {
  let component: TopSaisieComponent;
  let fixture: ComponentFixture<TopSaisieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSaisieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
