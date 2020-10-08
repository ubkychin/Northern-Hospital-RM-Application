import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfResourceComponent } from './pdf-resource.component';

describe('PdfResourceComponent', () => {
  let component: PdfResourceComponent;
  let fixture: ComponentFixture<PdfResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
