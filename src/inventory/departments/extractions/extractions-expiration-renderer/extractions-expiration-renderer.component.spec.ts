import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractionsExpirationRendererComponent } from './extractions-expiration-renderer.component';

describe('ExtractionsExpirationRendererComponent', () => {
  let component: ExtractionsExpirationRendererComponent;
  let fixture: ComponentFixture<ExtractionsExpirationRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtractionsExpirationRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractionsExpirationRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
