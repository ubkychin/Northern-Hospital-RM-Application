import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasBreathComponent } from './vas-breath.component';

describe('VasBreathComponent', () => {
  let component: VasBreathComponent;
  let fixture: ComponentFixture<VasBreathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasBreathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasBreathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
