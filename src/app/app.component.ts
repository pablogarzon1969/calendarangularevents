import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef,ChangeDetectorRef } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  subWeeks,
  subMonths,
  addWeeks,
  addMonths
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import '../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  view: string = 'month';
  viewDate: Date = new Date();
  /*viewDate: Date = new Date();
  events = [];*/
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  ngOnInit() {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  activeDayIsOpen: boolean = true;
  refresh: Subject<any> = new Subject();
  constructor() { }

  /*dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date)) ||
        events.length === 0
      ) {
      } else {
        this.viewDate = date;
      }
    }
  }*/

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  increment(): void {

    const addFn: any = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[this.view];

    this.viewDate = addFn(this.viewDate, 1);

  }

  decrement(): void {

    const subFn: any = {
      day: subDays,
      week: subWeeks,
      month: subMonths
    }[this.view];

    this.viewDate = subFn(this.viewDate, 1);

  }

  today(): void {
    this.viewDate = new Date();
  }



  handleEvent(action: string, event: CalendarEvent): void {
    //this.modalData = { event, action };
   // this.modal.open(this.modalContent, { size: 'lg' });
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        //this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        //this.handleEvent('Deleted', event);
      }
    }
  ];

  /*events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(this.newDateFirst),1),
     end: addDays(this.newDateFirst, 1),
      title: 'Primer dia evento',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(this.newDateFirst),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    }
    ,
    {
      start: subDays(endOfMonth(this.newDateFirst), 3),
      end: addDays(endOfMonth(this.newDateFirst), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    }
    ,
    {
      start: addHours(startOfDay(this.newDateFirst), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];*/


  dateString: string = '2018-03-19T05:00:00.000Z';
  newDateFirst = new Date(this.dateString);

  dateStringDos: string = '2018-03-22T05:00:00.000Z';
  newDateFirstDos = new Date(this.dateStringDos);

  

  events: CalendarEvent[] = [
   {
    start: startOfDay(this.newDateFirst),
    end: startOfDay(this.newDateFirst),
    title: 'Fin de semestre',
    color: colors.yellow
   }
   ,
   {
    start: startOfDay(this.dateStringDos),
    end: startOfDay(this.dateStringDos),
    title: 'Entrega de Notas',
    color: colors.red
   }
  ];













}
