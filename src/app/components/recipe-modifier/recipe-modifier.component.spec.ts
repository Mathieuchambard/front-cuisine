import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeModifierComponent } from './recipe-modifier.component';

describe('RecipeModifierComponent', () => {
  let component: RecipeModifierComponent;
  let fixture: ComponentFixture<RecipeModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeModifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
