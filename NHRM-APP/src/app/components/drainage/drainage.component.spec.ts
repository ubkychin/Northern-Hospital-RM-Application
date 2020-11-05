import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrainageComponent } from './drainage.component';

describe('DrainageComponent', () => {
  let component: DrainageComponent;
  let fixture: ComponentFixture<DrainageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrainageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrainageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
