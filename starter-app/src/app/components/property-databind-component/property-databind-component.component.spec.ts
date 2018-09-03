import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDatabindComponentComponent } from './property-databind-component.component';

describe('PropertyDatabindComponentComponent', () => {
  let component: PropertyDatabindComponentComponent;
  let fixture: ComponentFixture<PropertyDatabindComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyDatabindComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDatabindComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
