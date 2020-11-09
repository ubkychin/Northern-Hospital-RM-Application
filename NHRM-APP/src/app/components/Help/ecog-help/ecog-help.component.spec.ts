import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcogHelpComponent } from './ecog-help.component';

describe('EcogHelpComponent', () => {
  let component: EcogHelpComponent;
  let fixture: ComponentFixture<EcogHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcogHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcogHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
