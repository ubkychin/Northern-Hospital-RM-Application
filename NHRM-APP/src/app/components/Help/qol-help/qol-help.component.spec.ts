import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QolHelpComponent } from './qol-help.component';

describe('QolHelpComponent', () => {
  let component: QolHelpComponent;
  let fixture: ComponentFixture<QolHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QolHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QolHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
