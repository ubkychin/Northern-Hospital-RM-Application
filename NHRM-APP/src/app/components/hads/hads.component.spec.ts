import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HadsComponent } from './hads.component';

describe('HadsComponent', () => {
  let component: HadsComponent;
  let fixture: ComponentFixture<HadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
