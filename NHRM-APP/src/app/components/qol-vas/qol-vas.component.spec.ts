import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QolVasComponent } from './qol-vas.component';

describe('QolVasComponent', () => {
  let component: QolVasComponent;
  let fixture: ComponentFixture<QolVasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QolVasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QolVasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
