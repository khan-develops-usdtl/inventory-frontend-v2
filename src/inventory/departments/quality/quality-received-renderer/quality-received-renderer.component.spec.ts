import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityReceivedRendererComponent } from './quality-received-renderer.component';

describe('QualityReceivedRendererComponent', () => {
  let component: QualityReceivedRendererComponent;
  let fixture: ComponentFixture<QualityReceivedRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityReceivedRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityReceivedRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
