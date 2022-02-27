import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassSpecReceivedRendererComponent } from './mass-spec-received-renderer.component';

describe('MassSpecReceivedRendererComponent', () => {
  let component: MassSpecReceivedRendererComponent;
  let fixture: ComponentFixture<MassSpecReceivedRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassSpecReceivedRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassSpecReceivedRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
