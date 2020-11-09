import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasInputComponent } from './vas-input.component';

describe('VasInputComponent', () => {
  let component: VasInputComponent;
  let fixture: ComponentFixture<VasInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
