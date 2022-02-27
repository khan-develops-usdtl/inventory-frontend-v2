import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdExpirationRendererComponent } from './rd-expiration-renderer.component';

describe('RdExpirationRendererComponent', () => {
  let component: RdExpirationRendererComponent;
  let fixture: ComponentFixture<RdExpirationRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdExpirationRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdExpirationRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
