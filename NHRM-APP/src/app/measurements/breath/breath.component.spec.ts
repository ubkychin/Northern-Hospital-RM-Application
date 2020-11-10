import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreathComponent } from './breath.component';

describe('VasBreathComponent', () => {
  let component: BreathComponent;
  let fixture: ComponentFixture<BreathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
