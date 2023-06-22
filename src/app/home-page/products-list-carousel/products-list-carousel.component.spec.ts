import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListCarouselComponent } from './products-list-carousel.component';

describe('ProductsListCarouselComponent', () => {
  let component: ProductsListCarouselComponent;
  let fixture: ComponentFixture<ProductsListCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsListCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsListCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
