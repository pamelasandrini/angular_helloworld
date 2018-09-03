import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDatabindComponentComponent } from './event-databind-component.component';

describe('EventDatabindComponentComponent', () => {
  let component: EventDatabindComponentComponent;
  let fixture: ComponentFixture<EventDatabindComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDatabindComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDatabindComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
