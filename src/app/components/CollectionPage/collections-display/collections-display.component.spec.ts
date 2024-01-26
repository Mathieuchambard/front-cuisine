import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsDisplayComponent } from './collections-display.component';

describe('CollectionsDisplayComponent', () => {
  let component: CollectionsDisplayComponent;
  let fixture: ComponentFixture<CollectionsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
