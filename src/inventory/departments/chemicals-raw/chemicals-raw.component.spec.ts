import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemicalsRawComponent } from './chemicals-raw.component';

describe('ChemicalsRawComponent', () => {
  let component: ChemicalsRawComponent;
  let fixture: ComponentFixture<ChemicalsRawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChemicalsRawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemicalsRawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
