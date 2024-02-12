import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCreatorComponent } from './recipe-creator.component';

describe('RecipeCreatorComponent', () => {
  let component: RecipeCreatorComponent;
  let fixture: ComponentFixture<RecipeCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
