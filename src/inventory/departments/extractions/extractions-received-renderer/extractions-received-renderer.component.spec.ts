import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractionsReceivedRendererComponent } from './extractions-received-renderer.component';

describe('ExtractionsReceivedRendererComponent', () => {
  let component: ExtractionsReceivedRendererComponent;
  let fixture: ComponentFixture<ExtractionsReceivedRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtractionsReceivedRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractionsReceivedRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
