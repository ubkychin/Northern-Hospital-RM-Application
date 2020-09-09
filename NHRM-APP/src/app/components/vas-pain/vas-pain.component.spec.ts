import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasPainComponent } from './vas-pain.component';

describe('VasPainComponent', () => {
  let component: VasPainComponent;
  let fixture: ComponentFixture<VasPainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasPainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasPainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
