import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientCreatorComponent } from './ingredient-creator.component';

describe('IngredientCreatorComponent', () => {
  let component: IngredientCreatorComponent;
  let fixture: ComponentFixture<IngredientCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
