import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidDrainVideoComponent } from './fluid-drain-video.component';

describe('FluidDrainVideoComponent', () => {
  let component: FluidDrainVideoComponent;
  let fixture: ComponentFixture<FluidDrainVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluidDrainVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluidDrainVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
