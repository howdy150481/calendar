import {v4 as uuid} from "uuid";
import {colors} from "./colors";
import {CalendarEvent} from "angular-calendar";

export default class CreateEvent {
  private id: string = uuid()
  private title: string = ''
  private details: string = ''
  private color: string = '' // hier nochmal schauen ob man das objekt übergeben kann.
  private dateStart: string = ''
  private timeStart: string = '00:00'
  private dateEnd: string = ''
  private timeEnd: string = '00:00'
  private allDay: boolean = false;

  setId(value: string): CreateEvent {
    this.id = value;
    return this;
  }

  setTitle(value: string): CreateEvent {
    this.title = value;
    return this;
  }

  setDetails(value: string): CreateEvent {
    this.details = value;
    return this;
  }

  setColor(value: string): CreateEvent {
    this.color = value;
    return this;
  }

  setDateStart(value: string): CreateEvent {
    this.dateStart = value;
    return this;
  }

  setTimeStart(value: string): CreateEvent {
    this.timeStart = value;
    return this;
  }

  setDateEnd(value: string): CreateEvent {
    this.dateEnd = value;
    return this;
  }

  setTimeEnd(value: string): CreateEvent {
    this.timeEnd = value;
    return this;
  }

  setAllDay(value: boolean): CreateEvent {
    this.allDay = value;
    return this;
  }

  public getEvent(): CalendarEvent {
    const start = this.dateStart + "T" + this.timeStart + ':00';
    const end = this.dateEnd + "T" + this.timeEnd + ':00';

    return {
      id: this.id,
      title: this.title,
      start: new Date(start),
      end: new Date(end),
      color: { ...colors[this.color] },
      meta: {
        details: this.details,
        colorId: this.color
      },
      resizable: {
        beforeStart: !this.allDay,
        afterEnd: !this.allDay,
      },
      draggable: !this.allDay,
      allDay: this.allDay,
      actions: [],
      cssClass: ""
    };
  }
}
