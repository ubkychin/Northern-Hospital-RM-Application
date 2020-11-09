import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasSliderComponent } from './vas-slider.component';

describe('VasSliderComponent', () => {
  let component: VasSliderComponent;
  let fixture: ComponentFixture<VasSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
