import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedRendererComponent } from './received-renderer.component';

describe('ReceivedRendererComponent', () => {
  let component: ReceivedRendererComponent;
  let fixture: ComponentFixture<ReceivedRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
