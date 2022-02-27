import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingExpirationRendererComponent } from './receiving-expiration-renderer.component';

describe('ReceivingExpirationRendererComponent', () => {
  let component: ReceivingExpirationRendererComponent;
  let fixture: ComponentFixture<ReceivingExpirationRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivingExpirationRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingExpirationRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
