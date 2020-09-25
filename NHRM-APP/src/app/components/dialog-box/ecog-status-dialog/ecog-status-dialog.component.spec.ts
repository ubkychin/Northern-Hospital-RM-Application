import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcogStatusDialogComponent } from './ecog-status-dialog.component';

describe('EcogStatusDialogComponent', () => {
  let component: EcogStatusDialogComponent;
  let fixture: ComponentFixture<EcogStatusDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcogStatusDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcogStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
