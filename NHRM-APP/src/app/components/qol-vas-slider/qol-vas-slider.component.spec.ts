import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QolVasSliderComponent } from './qol-vas-slider.component';

describe('QolVasSliderComponent', () => {
  let component: QolVasSliderComponent;
  let fixture: ComponentFixture<QolVasSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QolVasSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QolVasSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
