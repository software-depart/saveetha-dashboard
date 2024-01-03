import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusFormComponent } from './campus-form.component';

describe('CampusFormComponent', () => {
  let component: CampusFormComponent;
  let fixture: ComponentFixture<CampusFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampusFormComponent]
    });
    fixture = TestBed.createComponent(CampusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
