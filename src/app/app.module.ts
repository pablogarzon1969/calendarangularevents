import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
 import { ProgressbarModule } from 'ngx-bootstrap/progressbar'; 
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { CalendarModule } from 'angular-calendar';
 //import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    /*NgbModalModule.forRoot(),*/
    CalendarModule.forRoot()
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
