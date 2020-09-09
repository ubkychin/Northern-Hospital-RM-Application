import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyNavComponent } from './survey-nav.component';

describe('SurveyNavComponent', () => {
  let component: SurveyNavComponent;
  let fixture: ComponentFixture<SurveyNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
