import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportItemsComponent } from './import-items.component';

describe('ImportItemsComponent', () => {
  let component: ImportItemsComponent;
  let fixture: ComponentFixture<ImportItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportItemsComponent]
    });
    fixture = TestBed.createComponent(ImportItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});