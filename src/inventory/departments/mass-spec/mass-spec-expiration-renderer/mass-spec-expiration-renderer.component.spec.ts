import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassSpecExpirationRendererComponent } from './mass-spec-expiration-renderer.component';

describe('MassSpecExpirationRendererComponent', () => {
  let component: MassSpecExpirationRendererComponent;
  let fixture: ComponentFixture<MassSpecExpirationRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassSpecExpirationRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassSpecExpirationRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
