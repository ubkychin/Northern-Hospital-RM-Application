import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientResourcesOgComponent } from './patient-resources-og.component';

describe('PatientResourcesOgComponent', () => {
  let component: PatientResourcesOgComponent;
  let fixture: ComponentFixture<PatientResourcesOgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientResourcesOgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientResourcesOgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
