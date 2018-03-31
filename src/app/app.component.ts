import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { CalendarEvent,CalendarDateFormatter,
  CalendarEventAction,
  CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
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
import { CustomDateFormatter } from '../app/CustomDateFormatter'

const RED_CELL: 'red-cell' = 'red-cell';
const BLUE_CELL: 'blue-cell' = 'blue-cell';
const PINK_CELL: 'pink-cell' = 'pink-cell';
const YELLOW_CELL: 'yellow_cell' = 'yellow_cell';
const GREY_CELL: 'grey-cell' = 'grey-cell';
const AQUAMARINE_CELL: 'aquamarine-cell' = 'aquamarine-cell';
const DOGGERBLUE_CELL: 'dodgerblue-cell' = 'dodgerblue-cell';
const WHITE_CELL: 'white-cell' = 'white-cell';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class AppComponent {
  clickedDate: Date;
  locale: string = 'co';
  view: string = 'month';

  viewDate: Date = new Date();
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  refresh: Subject<any> = new Subject();

  cssClass: string = PINK_CELL;
  cssClassSecond: string= YELLOW_CELL;
  cssClassThird: string= WHITE_CELL;

  ngOnInit() {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  refreshView(): void {
    this.cssClass = PINK_CELL ;
    this.cssClassSecond =  YELLOW_CELL;
    this.cssClassThird= WHITE_CELL;
    this.refresh.next();
  }


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


  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    debugger;
    body.forEach(day => {
     /* if (day.date.getDate() % 2 === 1) {
        day.cssClass = this.cssClass;
      }*/

      debugger;
      if (day.date.getDate()==30 && day.date.getMonth()+1==3)
      {
        day.cssClass = this.cssClass;
      }
      else if  (day.date.getDate()==2 && day.date.getMonth()+1==3)
      {
        day.cssClass = this.cssClassSecond;

      }

      else if  (day.date.getDate()==8 && day.date.getMonth()+1==3)
      {
        day.cssClass = this.cssClass;

      }
      else
      {
        day.cssClass =this.cssClassThird;
      }
    });
  }
}
