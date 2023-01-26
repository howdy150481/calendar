import {v4 as uuid} from "uuid";
import moment from "moment/moment";
import { colors } from "./colors";

export const exampleEvents: any[] = [
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