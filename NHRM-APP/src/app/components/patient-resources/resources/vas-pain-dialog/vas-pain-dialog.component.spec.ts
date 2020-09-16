import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VASPainDialogComponent } from './vas-pain-dialog.component';

describe('VASPainDialogComponent', () => {
  let component: VASPainDialogComponent;
  let fixture: ComponentFixture<VASPainDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VASPainDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VASPainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
