import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpcSurveysComponent } from './ipc-surveys.component';

describe('IpcServeysComponent', () => {
  let component: IpcSurveysComponent;
  let fixture: ComponentFixture<IpcSurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpcSurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpcSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
