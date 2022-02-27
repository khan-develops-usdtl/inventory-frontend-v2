import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningExpirationRendererComponent } from './screening-expiration-renderer.component';

describe('ScreeningExpirationRendererComponent', () => {
  let component: ScreeningExpirationRendererComponent;
  let fixture: ComponentFixture<ScreeningExpirationRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreeningExpirationRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningExpirationRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
