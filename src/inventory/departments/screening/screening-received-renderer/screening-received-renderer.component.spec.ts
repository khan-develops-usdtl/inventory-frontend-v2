import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningReceivedRendererComponent } from './screening-received-renderer.component';

describe('ScreeningReceivedRendererComponent', () => {
  let component: ScreeningReceivedRendererComponent;
  let fixture: ComponentFixture<ScreeningReceivedRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreeningReceivedRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningReceivedRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
