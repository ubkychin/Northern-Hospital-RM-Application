import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidHelpComponent } from './fluid-help.component';

describe('FluidHelpComponent', () => {
  let component: FluidHelpComponent;
  let fixture: ComponentFixture<FluidHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluidHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluidHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
