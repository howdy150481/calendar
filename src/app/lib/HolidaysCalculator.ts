// let holidays = new HolidaysCalculator();
//
// this.text = holidays
//     .setYear(2023)
//     .calculateHolidays()
//     .getHolidays();


// import { DateTime } from 'luxon';
// import { easter } from 'date-easter'
//
// export default class HolidaysCalculator {
//     private holidays: any[] = [];
//
//     private year: number = 0;
//
//     constructor() {
//
//     }
//
//     public setYear(year: number) {
//         this.year = year;
//         return this;
//     }
//
//     public getHolidays() {
//         return this.holidays;
//     }
//
//     public calculateHolidays() {
//         this.holidays.push({
//             'title': 'Neujahr',
//             'date': DateTime.fromISO('2023-01-01')
//         });
//
//         this.holidays.push({
//             'title': 'Ostersonntag',
//             'date': this.getCalculatedDate(50)
//         });
//
//
//
// // $aHolidayList = [
// //     '01.01.' => 'Neujahr',
// //     'E+0'    => 'Ostersonntag',
// //     'E+1'    => 'Ostermontag',
// //     '01.05.' => 'Staatsfeiertag',
// //     'E+39'   => 'Christi Himmelfahrt',
// //     'E+50'   => 'Pfingstmontag',
// //     'E+60'   => 'Fronleichnam',
// //     '15.08.' => 'Maria Himmelfahrt',
// //     '26.10.' => 'Nationalfeiertag',
// //     '01.11.' => 'Allerheiligen',
// //     '08.12.' => 'Maria Empfängnis',
// //     '24.12.' => 'Heilig Abend',
// //     '25.12.' => 'Christtag',
// //     '26.12.' => 'Stefanitag',
// //     '31.12.' => 'Silvester'
// // ];
//
//         return this;
//     }
//
//     private getCalculatedDate(days: number) {
//         let easterDate = DateTime.fromObject(easter(this.year));
//         return easterDate.plus({ days: days });
//     }
//
//     // private getEasterDate(Y: number) {
//     //     let C = Math.floor(Y / 100);
//     //     let N = Y - 19 * Math.floor(Y / 19);
//     //     let K = Math.floor((C - 17) / 25);
//     //     let I = C - Math.floor(C / 4) - Math.floor((C - K)/3) + 19 * N + 15;
//     //     I = I - 30 * Math.floor((I / 30));
//     //     I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
//     //     let J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
//     //     J = J - 7 * Math.floor(J / 7);
//     //     let L = I - J;
//     //     let M = 3 + Math.floor((L + 40) / 44);
//     //     let D = L + 28 - 31 * Math.floor(M / 4);
//     //
//     //     let dateString = Y + '-' + (M < 10 ? '0' + M : M) + '-' + (D < 10 ? '0' + D : D);
//     //     return DateTime.fromISO(dateString);
//     // }
// }
//
// // 2000: April 23
// // 2001: April 15
// // 2002: March 31
// // 2003: April 20
// // 2004: April 11
// // 2005: March 27
// // 2006: April 16
// // 2007: April 8
// // 2008: March 23
// // 2009: April 12
// // 2010: April 4
// // 2011: April 24
// // 2012: April 8
// // 2013: March 31
// // 2014: April 20
// // 2015: April 5
// // 2016: March 27
// // 2017: April 16
// // 2018: April 1
// // 2019: April 21
// // 2020: April 12
// // 2021: April 4