import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Call000Component } from './call000.component';

describe('Call000Component', () => {
  let component: Call000Component;
  let fixture: ComponentFixture<Call000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Call000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Call000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
