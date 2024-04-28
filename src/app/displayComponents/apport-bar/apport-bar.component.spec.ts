import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApportBarComponent } from './apport-bar.component';

describe('ApportBarComponent', () => {
  let component: ApportBarComponent;
  let fixture: ComponentFixture<ApportBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApportBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApportBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
