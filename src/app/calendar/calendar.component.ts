import {Component} from '@angular/core';
import {CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK} from "angular-calendar";
import {CustomDateFormatter} from "./custom-date-formatter.provider";
import {colors} from "../lib/colors";
import {EditEntryComponent} from "../edit-entry/edit-entry.component";
import {MatDialog} from "@angular/material/dialog";
import {Subject} from "rxjs";
import moment from "moment";
import { v4 as uuid } from "uuid";

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
  constructor(public dialog: MatDialog) {}

  refresh = new Subject<void>();

  view: CalendarView = CalendarView.Week;
  viewDate = new Date();
  locale: string = 'de';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  events: CalendarEvent[] = [
    {
      title: 'Feiertag Test',
      id: uuid(),
      start: new Date('2023-01-25'),
      end: new Date('2023-01-25'),
      color: { ...colors.pink },
      meta: {
        details: 'Moooh',
        colorId: 'pink'
      },
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
      allDay: true,
    },
    {
      title: 'Event 1',
      id: uuid(),
      start: new Date('2023-01-24T10:00:00'),
      end: new Date('2023-01-24T13:00:00'),
      color: { ...colors.purple },
      meta: {
        details: 'Miau',
        colorId: 'purple'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      title: 'Event 2',
      id: uuid(),
      start: moment(new Date()).add(-1, 'hours').toDate(),
      end: moment(new Date()).add(4, 'hours').toDate(),
      color: { ...colors.yellow },
      meta: {
        details: 'Wuff',
        colorId: 'yellow'
      },
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
    const dialogRef = this.dialog.open(EditEntryComponent, {
      data: event
    });
    dialogRef.componentInstance.saveEvent.subscribe((event: any) => {
      this.events.push(event);
      this.refresh.next();
    });
  }

  onEventClicked(event: any): void {
    const dialogRef = this.dialog.open(EditEntryComponent, {
      data: event
    });
    dialogRef.componentInstance.saveEvent.subscribe((event: any) => {
      for (let key in this.events) {
        if (this.events[key].id === event.id) {
          this.events[key] = event
        }
      }
      this.refresh.next();
    });
    dialogRef.componentInstance.deleteEvent.subscribe((id: string) => {
      for (let key in this.events) {
        if (this.events[key].id === id) {
          this.events.splice(Number(key), 1);
        }
      }
      this.refresh.next();
    });
  }

  onEventTimesChanged(event: any): void {
    for (let key in this.events) {
      if (this.events[key].id === event.event.id) {
        this.events[key].start = event.newStart
        this.events[key].end = event.newEnd
      }
    }
    this.refresh.next();
  }
}
