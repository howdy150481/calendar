import { Component } from '@angular/core';
import {CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK} from "angular-calendar";
import {CustomDateFormatter} from "./custom-date-formatter.provider";
const moment = require("moment");

moment.updateLocale('de', {
  week: {
    dow: DAYS_OF_WEEK.MONDAY,
    doy: 0,
  },
});

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    }
  ]
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;
  viewDate = new Date();
  events: CalendarEvent[] = [];
  locale: string = 'de';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];


  changeViewDate(viewDate: Date): void {
    this.viewDate = viewDate;
  }

  changeCalendarView(view: CalendarView): void {
    this.view = view;
  }
}
