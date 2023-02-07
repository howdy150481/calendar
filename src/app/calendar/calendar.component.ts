import {Component} from '@angular/core';
import {CalendarDateFormatter, CalendarEvent, DAYS_OF_WEEK} from "angular-calendar";
import { CalendarView } from '../lib/CalendarView';
import {CustomDateFormatter} from "./custom-date-formatter.provider";
import {EditEntryComponent} from "../edit-entry/edit-entry.component";
import {MatDialog} from "@angular/material/dialog";
import {Subject} from "rxjs";
import HolidaysCalculator from "../lib/HolidaysCalculator";
import {AlertDialogComponent} from "../helper/alert-dialog/alert-dialog.component";
import {HttpClient} from "@angular/common/http";
import CreateEvent from "../lib/CreateEvent";

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

  view: CalendarView = CalendarView.Week;

  viewDate = new Date();
  locale: string = 'de';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  
  events: CalendarEvent[] = [];

  constructor(public matDialog: MatDialog, private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000').subscribe(result => {
      let holidays = [];
      let createEvent = new CreateEvent();   

      for (const key in result) {
        createEvent
            .setId(result[key].id)
            .setTitle(result[key].title)
            .setDateEnd(result[key].det)
            .setDateStart(result[key].dateStart)
            .setTimeStart(result[key].timeStart)
            .setDateEnd(result[key].dateEnd)
            .setTimeEnd(result[key].timeEnd)
            .setColor(result[key].color)
            .setAllDay(result[key].allDay)
            .setEditable(result[key].editable);
        holidays.push(createEvent.getEvent());
      }
      this.events.push(...holidays);
      this.refresh.next();
    });

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
