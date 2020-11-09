import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainHelpComponent } from './pain-help.component';

describe('PainHelpComponent', () => {
  let component: PainHelpComponent;
  let fixture: ComponentFixture<PainHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
