import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientResourcesComponent } from './patient-resources.component';

describe('PatientResourcesComponent', () => {
  let component: PatientResourcesComponent;
  let fixture: ComponentFixture<PatientResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
