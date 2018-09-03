import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWayDatabindComponentComponent } from './two-way-databind-component.component';

describe('TwoWayDatabindComponentComponent', () => {
  let component: TwoWayDatabindComponentComponent;
  let fixture: ComponentFixture<TwoWayDatabindComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoWayDatabindComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoWayDatabindComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
