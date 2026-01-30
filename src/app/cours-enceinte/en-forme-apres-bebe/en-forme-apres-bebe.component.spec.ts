import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnFormeApresBebeComponent } from './en-forme-apres-bebe.component';

describe('EnFormeApresBebeComponent', () => {
  let component: EnFormeApresBebeComponent;
  let fixture: ComponentFixture<EnFormeApresBebeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnFormeApresBebeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnFormeApresBebeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
