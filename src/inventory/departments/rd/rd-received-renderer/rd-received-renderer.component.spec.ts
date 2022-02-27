import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdReceivedRendererComponent } from './rd-received-renderer.component';

describe('RdReceivedRendererComponent', () => {
  let component: RdReceivedRendererComponent;
  let fixture: ComponentFixture<RdReceivedRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdReceivedRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdReceivedRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
