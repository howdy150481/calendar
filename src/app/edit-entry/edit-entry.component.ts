import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { ConfirmDialogComponent } from '../helper/confirm-dialog/confirm-dialog.component';
import {colors} from "../lib/colors";
const moment = require("moment/moment");
const uuid = require('uuid');
const Cleave = require('cleave.js');

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.scss']
})
export class EditEntryComponent {
  @Output() saveEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  existingEvent: boolean = false;

  id: number = 0;
  title: string = '';
  details: string = '';
  dateStart: string = '';
  timeStart: string = '';
  dateEnd: string = '';
  timeEnd: string = '';

  constructor(
    public editEntryDialogRef: MatDialogRef<EditEntryComponent>,
    public confirmDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if(data.event !== undefined) {
      this.existingEvent = true;
      this.id = data.event.id;

      this.dateStart = moment(data.event.start.toISOString()).format("DD.MM.YYYY");
      this.timeStart = moment(data.event.start.toISOString()).format("HH:mm");
      this.dateEnd = moment(data.event.end.toISOString()).format("DD.MM.YYYY");
      this.timeEnd = moment(data.event.end.toISOString()).format("HH:mm");

      this.title = data.event.title;
      this.details = data.event.meta.details
    } else {
      this.id = uuid.v4()
      this.dateStart = moment(data.date.toISOString()).format("DD.MM.YYYY");
      this.timeStart = moment(data.date.toISOString()).format("HH:mm");
      this.dateEnd = moment(data.date.toISOString()).format("DD.MM.YYYY");
      this.timeEnd = moment(data.date.toISOString()).format("HH:mm");
    }
  }

  save(): void {
    const dateStart = moment(this.dateStart, "DD.MM.YYYY").format("YYYY-MM-DD");
    const dateEnd = moment(this.dateEnd, "DD.MM.YYYY").format("YYYY-MM-DD");

    const event = {
      id: this.id,
      title: this.title,
      start: new Date(dateStart + "T" + this.timeStart + ':00'),
      end: new Date(dateEnd + "T" + this.timeEnd + ':00'),
      color: { ...colors.yellow },
      meta: {
        details: this.details
      },
      resizable: {
        beforeStart: true,
          afterEnd: true,
      },
      draggable: true,
    };

    this.saveEvent.emit(event);
    this.editEntryDialogRef.close();
  }

  delete(): void {
    const confirmDialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        title: "Eintrag löschen?",
        message: "Soll dieser Termin wirklich gelöscht werden?"
      }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEvent.emit(this.id);
        this.editEntryDialogRef.close();
      }
    });
  }

  closeDialog(): void {
    this.editEntryDialogRef.close();
  }
}
