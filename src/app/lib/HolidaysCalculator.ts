import { easter } from 'date-easter'
import moment from "moment/moment";
import CreateEvent from "./CreateEvent";

export default class HolidaysCalculator {
  private holidays: any[] = [];
  private year: number = 0;

  public setYear(year: number) {
    this.year = year;
    return this;
  }

  public calculateHolidays() {
    let createEvent = new CreateEvent();

    createEvent
      .setColor('green')
      .setAllDay(true)
      .setEditable(false);

    createEvent
      .setTitle('Neujahr')
      .setDateStart('2023-01-01')
      .setDateEnd('2023-01-01');
    this.holidays.push(createEvent.getEvent());

    createEvent
        .setTitle('Karfreitag')
        .setDateStart(this.getCalculatedDate(-2))
        .setDateEnd(this.getCalculatedDate(-2));
    this.holidays.push(createEvent.getEvent());

    createEvent
      .setTitle('Ostersonntag')
      .setDateStart(this.getCalculatedDate(0))
      .setDateEnd(this.getCalculatedDate(0));
    this.holidays.push(createEvent.getEvent());

    createEvent
        .setTitle('Ostermontag')
        .setDateStart(this.getCalculatedDate(1))
        .setDateEnd(this.getCalculatedDate(1));
    this.holidays.push(createEvent.getEvent());

    createEvent
        .setTitle('Tag der Arbeit')
        .setDateStart('2023-05-01')
        .setDateEnd('2023-05-01');
    this.holidays.push(createEvent.getEvent());

    createEvent
        .setTitle('Christi Himmelfahrt')
        .setDateStart(this.getCalculatedDate(39))
        .setDateEnd(this.getCalculatedDate(39));
    this.holidays.push(createEvent.getEvent());

    createEvent
        .setTitle('Pfingstmontag')
        .setDateStart(this.getCalculatedDate(50))
        .setDateEnd(this.getCalculatedDate(50));
    this.holidays.push(createEvent.getEvent());

    createEvent
        .setTitle('Tag der Deutschen Einheit')
        .setDateStart('2023-10-03')
        .setDateEnd('2023-10-03');
    this.holidays.push(createEvent.getEvent());

    createEvent
        .setTitle('Reformationstag')
        .setDateStart('2023-10-31')
        .setDateEnd('2023-10-31');
    this.holidays.push(createEvent.getEvent());

    createEvent
        .setTitle('Heiligabend')
        .setDateStart('2023-12-24')
        .setDateEnd('2023-12-24');
    this.holidays.push(createEvent.getEvent());

    createEvent
        .setTitle('Erster Weihnachtsfeiertag')
        .setDateStart('2023-12-25')
        .setDateEnd('2023-12-25');
    this.holidays.push(createEvent.getEvent());

    createEvent
        .setTitle('Zweiter Weihnachtsfeiertag')
        .setDateStart('2023-12-26')
        .setDateEnd('2023-12-26');
    this.holidays.push(createEvent.getEvent());

    createEvent
        .setTitle('Silvester')
        .setDateStart('2023-12-31')
        .setDateEnd('2023-12-31');
    this.holidays.push(createEvent.getEvent());

    return this;
  }

  public getHolidays() {
    return this.holidays;
  }

  private getCalculatedDate(days: number) {
    const easterDate = easter(this.year);

    let holidayDate = moment();
    holidayDate
      .set('date', easterDate.day)
      .set('month', easterDate.month)
      .set('year', easterDate.year)
      .subtract(1, 'months') // Januar = 0...
      .add(days, 'days')

    return holidayDate.format('YYYY-MM-DD');
  }
}
