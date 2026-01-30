import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnceinteEnFormeComponent } from './enceinte-en-forme.component';

describe('EnceinteEnFormeComponent', () => {
  let component: EnceinteEnFormeComponent;
  let fixture: ComponentFixture<EnceinteEnFormeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnceinteEnFormeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnceinteEnFormeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
