import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcogStatusComponent } from './ecog-status.component';

describe('EcogStatusComponent', () => {
  let component: EcogStatusComponent;
  let fixture: ComponentFixture<EcogStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcogStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcogStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
