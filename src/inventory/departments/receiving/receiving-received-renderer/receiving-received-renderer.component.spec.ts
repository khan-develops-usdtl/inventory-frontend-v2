import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingReceivedRendererComponent } from './receiving-received-renderer.component';

describe('ReceivingReceivedRendererComponent', () => {
  let component: ReceivingReceivedRendererComponent;
  let fixture: ComponentFixture<ReceivingReceivedRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivingReceivedRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingReceivedRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
