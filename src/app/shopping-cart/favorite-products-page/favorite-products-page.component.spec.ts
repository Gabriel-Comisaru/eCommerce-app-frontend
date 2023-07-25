import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteProductsPageComponent } from './favorite-products-page.component';

describe('FavoriteProductsPageComponent', () => {
  let component: FavoriteProductsPageComponent;
  let fixture: ComponentFixture<FavoriteProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteProductsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
