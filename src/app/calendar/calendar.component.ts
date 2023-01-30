import {Component} from '@angular/core';
import {CalendarDateFormatter, CalendarEvent, DAYS_OF_WEEK} from "angular-calendar";
import { CalendarView } from '../lib/CalendarView';
import {CustomDateFormatter} from "./custom-date-formatter.provider";
import {EditEntryComponent} from "../edit-entry/edit-entry.component";
import {MatDialog} from "@angular/material/dialog";
import {Subject} from "rxjs";
import {exampleEvents} from "../lib/example_events";
import HolidaysCalculator from "../lib/HolidaysCalculator";
import {AlertDialogComponent} from "../helper/alert-dialog/alert-dialog.component";

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
  refresh = new Subject<void>();
  CalendarView = CalendarView;

  view: CalendarView = CalendarView.List;

  viewDate = new Date();
  locale: string = 'de';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  events: CalendarEvent[] = [...exampleEvents];
  // events: CalendarEvent[] = [];

  constructor(public matDialog: MatDialog) {
    let holidaysCalculator = new HolidaysCalculator();
    const holidays = holidaysCalculator
      .setYear(2023)
      .calculateHolidays()
      .getHolidays();

    this.events.push(...holidays);
  }

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
    const dialogRef = this.matDialog.open(EditEntryComponent, {
      data: event
    });
    dialogRef.componentInstance.saveEvent.subscribe((event: any) => {
      this.events.push(event);
      this.refresh.next();
    });
  }

  onEventClicked(event: any): void {
    if (!event.event.meta.editable) {
      this.matDialog.open(AlertDialogComponent, {
        data: {
          title: "Termin gesperrt",
          message: "Dieser Termin kann nicht verändert werden."
        }
      });
    } else {
      const dialogRef = this.matDialog.open(EditEntryComponent, {
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
