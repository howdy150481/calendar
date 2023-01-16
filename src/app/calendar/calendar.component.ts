import {Component} from '@angular/core';
import {CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK} from "angular-calendar";
import {CustomDateFormatter} from "./custom-date-formatter.provider";
import {colors} from "../lib/colors";

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
  locale: string = 'de';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fas fa-fw fa-pencil-alt"></i>',
  //     a11yLabel: 'Edit',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     },
  //   },
  //   {
  //     label: '<i class="fas fa-fw fa-trash-alt"></i>',
  //     a11yLabel: 'Delete',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter((iEvent) => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     },
  //   },
  // ];

  events: CalendarEvent[] = [
    {
      start: new Date('2023-01-18'),
      end: new Date('2023-01-18'),
      title: 'Feiertag Test',
      color: { ...colors.red },
      allDay: true,
    },
    {
      title: 'Event 1',
      start: moment(new Date()).add(-2, 'hours').toDate(),
      end: moment(new Date()).add(4, 'hours').toDate(),
      color: { ...colors.blue },
      // actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      title: 'Event 2',
      start: moment(new Date()).add(-1, 'hours').toDate(),
      end: moment(new Date()).add(4, 'hours').toDate(),
      color: { ...colors.yellow },
      // actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }
  ];

  changeViewDate(viewDate: Date): void {
    this.viewDate = viewDate;
  }

  changeCalendarView(view: CalendarView): void {
    this.view = view;
  }

  onDayClicked(event: any): void {
    this.viewDate = event.day.date;
    this.view = CalendarView.Week;
  }

  onHourSegmentClicked(event: any): void {
    console.log('onHourSegmentClicked');
    console.log(event);
  }

  onEventClicked(event: any): void {
    console.log('onEventClicked');
    console.log(event);
  }

  onEventTimesChanged(event: any): void {
    console.log('onEventTimesChanged');
    console.log(event);
  }
}
