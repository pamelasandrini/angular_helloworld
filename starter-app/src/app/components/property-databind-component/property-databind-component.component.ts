import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-databind-component',
  templateUrl: './property-databind-component.component.html',
  styleUrls: ['./property-databind-component.component.css']
})
export class PropertyDatabindComponentComponent implements OnInit {


  female = {
    name: 'Black Widow',
    sex: 'f',
    rating: 3,
    photo: 'assets/images/black_widow.jpg'
  };

  male = {
    name: 'Thor',
    sex: 'm',
    rating: 5,
    photo: 'assets/images/thor.jpg'
  };
  
  person: any = this.female;

  constructor() { }

  ngOnInit() {
  }

}
