import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreathHelpComponent } from './breath-help.component';

describe('BreathHelpComponent', () => {
  let component: BreathHelpComponent;
  let fixture: ComponentFixture<BreathHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreathHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreathHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
