import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QolComponent } from './qol.component';

describe('QolComponent', () => {
  let component: QolComponent;
  let fixture: ComponentFixture<QolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
