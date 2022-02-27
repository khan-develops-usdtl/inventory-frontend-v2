import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirationRendererComponent } from './expiration-renderer.component';

describe('ExpirationRendererComponent', () => {
  let component: ExpirationRendererComponent;
  let fixture: ComponentFixture<ExpirationRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpirationRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpirationRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
