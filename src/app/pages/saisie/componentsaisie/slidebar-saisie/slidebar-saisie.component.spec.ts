import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidebarSaisieComponent } from './slidebar-saisie.component';

describe('SlidebarSaisieComponent', () => {
  let component: SlidebarSaisieComponent;
  let fixture: ComponentFixture<SlidebarSaisieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidebarSaisieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidebarSaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
