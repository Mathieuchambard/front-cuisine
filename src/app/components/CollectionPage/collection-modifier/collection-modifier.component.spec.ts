import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionModifierComponent } from './collection-modifier.component';

describe('CollectionModifierComponent', () => {
  let component: CollectionModifierComponent;
  let fixture: ComponentFixture<CollectionModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionModifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
