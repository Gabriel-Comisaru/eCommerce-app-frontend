import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStatusComponent } from './product-status.component';

describe('ProductStatusComponent', () => {
  let component: ProductStatusComponent;
  let fixture: ComponentFixture<ProductStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
