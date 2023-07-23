import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrdersPageComponent } from './user-orders-page.component';

describe('UserOrdersPageComponent', () => {
  let component: UserOrdersPageComponent;
  let fixture: ComponentFixture<UserOrdersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrdersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
