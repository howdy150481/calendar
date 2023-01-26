import {Component} from '@angular/core';
import {CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK} from "angular-calendar";
import {CustomDateFormatter} from "./custom-date-formatter.provider";
import {EditEntryComponent} from "../edit-entry/edit-entry.component";
import {MatDialog} from "@angular/material/dialog";
import {Subject} from "rxjs";
import moment from "moment";
import {exampleEvents} from "../lib/example_events";

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

  events: CalendarEvent[] = exampleEvents;

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
