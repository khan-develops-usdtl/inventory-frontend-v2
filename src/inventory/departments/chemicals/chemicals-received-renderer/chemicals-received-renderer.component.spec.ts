import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChemicalsService } from '../chemicals.service';
import { ChemicalsReceivedRendererComponent } from './chemicals-received-renderer.component';

describe('ChemicalsReceivedRendererComponent', () => {
  let component: ChemicalsReceivedRendererComponent;
  let fixture: ComponentFixture<ChemicalsReceivedRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChemicalsReceivedRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemicalsReceivedRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
