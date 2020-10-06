import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpcSheetOgComponent } from './ipc-sheet-og.component';

describe('IpcSheetOgComponent', () => {
  let component: IpcSheetOgComponent;
  let fixture: ComponentFixture<IpcSheetOgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpcSheetOgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpcSheetOgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
