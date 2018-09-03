import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DataTableModule } from "angular2-datatable";

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { TwoWayDatabindComponentComponent } from './components/two-way-databind-component/two-way-databind-component.component';
import { PropertyDatabindComponentComponent } from './components/property-databind-component/property-databind-component.component';
import { EventDatabindComponentComponent } from './components/event-databind-component/event-databind-component.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';

// Services 
import { UsersService } from './services/user.service';
import { HeroListComponent } from './components/hero-list/hero-list.component';

//Pipe
import { UserListTableSearchPipe } from './components/hero-list/hero-list.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    TestComponentComponent,
    TwoWayDatabindComponentComponent,
    PropertyDatabindComponentComponent,
    EventDatabindComponentComponent,
    HeroFormComponent,
    HeroListComponent,
    UserListTableSearchPipe
  ],
  imports: [
    BrowserModule,
    routes,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTableModule

  ],
  providers: [
    DatePipe,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
