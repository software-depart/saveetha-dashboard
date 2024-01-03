import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurentFormComponent } from './restaurent-form.component';

describe('RestaurentFormComponent', () => {
  let component: RestaurentFormComponent;
  let fixture: ComponentFixture<RestaurentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurentFormComponent]
    });
    fixture = TestBed.createComponent(RestaurentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
