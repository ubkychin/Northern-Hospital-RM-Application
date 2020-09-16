import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IPCSheetComponent } from './ipc-sheet.component';

describe('IPCSheetComponent', () => {
  let component: IPCSheetComponent;
  let fixture: ComponentFixture<IPCSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IPCSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IPCSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
