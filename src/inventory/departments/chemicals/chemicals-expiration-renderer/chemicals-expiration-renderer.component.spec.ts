import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChemicalsService } from '../chemicals.service';
import { ChemicalsExpirationRendererComponent } from './chemicals-expiration-renderer.component';

describe('ChemicalsExpirationRendererComponent', () => {
  let component: ChemicalsExpirationRendererComponent;
  let fixture: ComponentFixture<ChemicalsExpirationRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChemicalsExpirationRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemicalsExpirationRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
