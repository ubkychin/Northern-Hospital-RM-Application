import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidDrainComponent } from './fluid-drain.component';

describe('FluidDrainComponent', () => {
  let component: FluidDrainComponent;
  let fixture: ComponentFixture<FluidDrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluidDrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluidDrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
