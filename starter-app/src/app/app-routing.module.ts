import { RouterModule, Routes } from '@angular/router';
import { MainComponentComponent }   from './components/main-component/main-component.component';
import { TestComponentComponent }   from './components/test-component/test-component.component';
import { TwoWayDatabindComponentComponent } from './components/two-way-databind-component/two-way-databind-component.component';
import { PropertyDatabindComponentComponent } from './components/property-databind-component/property-databind-component.component';
import { EventDatabindComponentComponent } from './components/event-databind-component/event-databind-component.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';

const appRoutes: Routes = [

  { path: '', component: MainComponentComponent , pathMatch: 'full'},
  { path: 'adduser', component: HeroFormComponent, pathMatch: 'full'},
  { path: 'main', component: MainComponentComponent, pathMatch: 'full' },
  { path: 'test' , component: TestComponentComponent, pathMatch: 'full' },
  { path: 'twowaybind', component: TwoWayDatabindComponentComponent, pathMatch: 'full'},
  { path: 'propertybind' , component: PropertyDatabindComponentComponent, pathMatch: 'full'},
  { path: 'eventbind', component: EventDatabindComponentComponent, pathMatch: 'full'}
  
];

export const routes = RouterModule.forRoot(appRoutes, { useHash: true });