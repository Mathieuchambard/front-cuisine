import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesDisplayComponent } from './recipes-display.component';

describe('RecipesDisplayComponent', () => {
  let component: RecipesDisplayComponent;
  let fixture: ComponentFixture<RecipesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
