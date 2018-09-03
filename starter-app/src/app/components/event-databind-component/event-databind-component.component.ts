import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-databind-component',
  templateUrl: './event-databind-component.component.html',
  styleUrls: ['./event-databind-component.component.css']
})
export class EventDatabindComponentComponent implements OnInit {

    event: MouseEvent;
    clientX = 0;
    clientY = 0;

    onEvent(event: MouseEvent): void {
        this.event = event;
    }

    coordinates(event: MouseEvent): void {
        this.clientX = event.clientX;
        this.clientY = event.clientY;
    }


  constructor() { }

  ngOnInit() {
  }

}
