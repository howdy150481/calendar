import {v4 as uuid} from "uuid";
import moment from "moment/moment";
import { colors } from "./colors";

export const holidayEvents: any[] = [
  {
    title: 'Feiertag 1',
    id: uuid(),
    start: new Date('2023-01-27'),
    end: new Date('2023-01-27'),
    color: { ...colors.brown },
    meta: {
      details: 'Sommer Sonne Sonnenschein...',
      colorId: 'brown'
    },
    resizable: {
      beforeStart: false,
      afterEnd: false,
    },
    draggable: false,
    allDay: true,
  },
  {
    title: 'Feiertag 2',
    id: uuid(),
    start: new Date('2023-01-24'),
    end: new Date('2023-01-24'),
    color: { ...colors.brown },
    meta: {
      details: 'Sommer Sonne Sonnenschein...',
      colorId: 'brown'
    },
    resizable: {
      beforeStart: false,
      afterEnd: false,
    },
    draggable: false,
    allDay: true,
  }
];