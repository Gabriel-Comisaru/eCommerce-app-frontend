import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatListComponent } from './product-cat-list.component';

describe('ProductCatListComponent', () => {
  let component: ProductCatListComponent;
  let fixture: ComponentFixture<ProductCatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCatListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
