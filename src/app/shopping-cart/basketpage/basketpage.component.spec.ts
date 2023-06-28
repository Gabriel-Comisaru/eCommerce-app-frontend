import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketpageComponent } from './basketpage.component';

describe('BasketpageComponent', () => {
  let component: BasketpageComponent;
  let fixture: ComponentFixture<BasketpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
