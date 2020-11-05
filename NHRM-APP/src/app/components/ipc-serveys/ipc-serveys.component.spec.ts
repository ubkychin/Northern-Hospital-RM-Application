import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpcServeysComponent } from './ipc-serveys.component';

describe('IpcServeysComponent', () => {
  let component: IpcServeysComponent;
  let fixture: ComponentFixture<IpcServeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpcServeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpcServeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
