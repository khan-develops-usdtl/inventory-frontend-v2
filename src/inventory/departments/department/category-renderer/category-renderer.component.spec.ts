import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRendererComponent } from './category-renderer.component';

describe('CategoryRendererComponent', () => {
  let component: CategoryRendererComponent;
  let fixture: ComponentFixture<CategoryRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
