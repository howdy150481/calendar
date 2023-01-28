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
    let createEvent;

    createEvent = new CreateEvent();
    createEvent
      .setTitle('Neujahr')
      .setColor('green')
      .setDateStart('2023-01-23')
      .setDateEnd('2023-01-23')
      .setAllDay(true);
    this.holidays.push(createEvent.getEvent());

    // createEvent = new CreateEvent();
    // createEvent
    //   .setTitle('Ostersonntag')
    //   .setDateStart(this.getCalculatedDate(0))
    //   .setDateEnd(this.getCalculatedDate(0))
    //   .setAllDay(true);
    // this.holidays.push(createEvent.getEvent());
    //
    // createEvent = new CreateEvent();
    // createEvent
    //   .setTitle('Ostersonntag')
    //   .setDateStart(this.getCalculatedDate(1))
    //   .setDateEnd(this.getCalculatedDate(1))
    //   .setAllDay(true);
    // this.holidays.push(createEvent.getEvent());

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

// $aHolidayList = [
//     '01.01.' => 'Neujahr',
//     'E+0'    => 'Ostersonntag',
//     'E+1'    => 'Ostermontag',
//     '01.05.' => 'Staatsfeiertag',
//     'E+39'   => 'Christi Himmelfahrt',
//     'E+50'   => 'Pfingstmontag',
//     'E+60'   => 'Fronleichnam',
//     '15.08.' => 'Maria Himmelfahrt',
//     '26.10.' => 'Nationalfeiertag',
//     '01.11.' => 'Allerheiligen',
//     '08.12.' => 'Maria Empfängnis',
//     '24.12.' => 'Heilig Abend',
//     '25.12.' => 'Christtag',
//     '26.12.' => 'Stefanitag',
//     '31.12.' => 'Silvester'
// ];
