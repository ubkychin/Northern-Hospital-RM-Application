import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementsCompleteComponent } from './measurements-complete.component';

describe('MeasurementsCompleteComponent', () => {
  let component: MeasurementsCompleteComponent;
  let fixture: ComponentFixture<MeasurementsCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementsCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementsCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
