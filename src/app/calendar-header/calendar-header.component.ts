import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CalendarView } from '../lib/CalendarView';
const moment = require("moment");

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {
  @Output() changeCalendarViewEvent = new EventEmitter<CalendarView>();
  @Output() changeViewDateEvent = new EventEmitter<Date>();

  @Input() view: CalendarView;
  @Input() viewDate: Date;

  CalendarView = CalendarView;

  headlineDate: string = '';

  ngOnInit() {
    this.headlineDate = moment(this.viewDate.toISOString()).format("DD.MM.YYYY");
  }

  changeViewDate(direction: string): void {
    let viewDate = moment();

    switch (direction) {
      case 'previous':
        viewDate = moment(this.viewDate).add(-1, this.view).toDate();
        break;
      case 'next':
        viewDate = moment(this.viewDate).add(1, this.view).toDate();
        break;
    }

    this.headlineDate = moment(viewDate.toISOString()).format("DD.MM.YYYY");
    this.changeViewDateEvent.emit(viewDate);
  }

  changeCalendarView(view: CalendarView): void {
    this.changeCalendarViewEvent.emit(view);
  }
}
