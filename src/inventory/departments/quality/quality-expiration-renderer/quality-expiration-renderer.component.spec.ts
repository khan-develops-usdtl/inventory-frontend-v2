import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityExpirationRendererComponent } from './quality-expiration-renderer.component';

describe('QualityExpirationRendererComponent', () => {
  let component: QualityExpirationRendererComponent;
  let fixture: ComponentFixture<QualityExpirationRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityExpirationRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityExpirationRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
