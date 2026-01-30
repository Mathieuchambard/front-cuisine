import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageEnceinteComponent } from './homepage-enceinte.component';

describe('HomepageEnceinteComponent', () => {
  let component: HomepageEnceinteComponent;
  let fixture: ComponentFixture<HomepageEnceinteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageEnceinteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageEnceinteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
