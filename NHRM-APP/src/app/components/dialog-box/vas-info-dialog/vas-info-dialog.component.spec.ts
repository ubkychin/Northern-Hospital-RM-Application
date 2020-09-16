import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasInfoDialogComponent } from './vas-info-dialog.component';

describe('VasInfoDialogComponent', () => {
  let component: VasInfoDialogComponent;
  let fixture: ComponentFixture<VasInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
