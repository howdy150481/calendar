import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { ConfirmDialogComponent } from '../helper/confirm-dialog/confirm-dialog.component';
import moment from "moment";
import { v4 as uuid } from "uuid";
import { colors } from "../lib/colors";
import { formatDateField, formatTimeField } from "../lib/cleave";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.scss']
})
export class EditEntryComponent {
  id: string;
  existingEvent: boolean = false;

  title = new FormControl('', [Validators.required]);
  details = new FormControl('', [Validators.required]);
  dateStart = new FormControl('', [Validators.required]);
  timeStart = new FormControl('', [Validators.required]);
  dateEnd = new FormControl('', [Validators.required]);
  timeEnd = new FormControl('', [Validators.required]);
  allDay = new FormControl(false);
  color = new FormControl('', [Validators.required]);

  colorOptions: any[] = Object.entries(colors);

  @Output() saveEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  constructor(
    public editEntryDialogRef: MatDialogRef<EditEntryComponent>,
    public confirmDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if(data.event !== undefined) {
      this.id = data.event.id;
      this.existingEvent = true;

      this.dateStart.setValue(moment(data.event.start.toISOString()).format("DD.MM.YYYY"));
      this.timeStart.setValue(moment(data.event.start.toISOString()).format("HH:mm"));
      this.dateEnd.setValue(moment(data.event.end.toISOString()).format("DD.MM.YYYY"));
      this.timeEnd.setValue(moment(data.event.end.toISOString()).format("HH:mm"));

      this.title.setValue(data.event.title);
      this.details.setValue(data.event.meta.details);
      this.allDay.setValue(data.event.allDay ?? false);
      this.color.setValue(data.event.meta.colorId);
    } else {
      this.id = uuid()

      this.dateStart.setValue(moment(data.date.toISOString()).format("DD.MM.YYYY"));
      this.timeStart.setValue(moment(data.date.toISOString()).format("HH:mm"));
      this.dateEnd.setValue(moment(data.date.toISOString()).format("DD.MM.YYYY"));
      this.timeEnd.setValue(moment(data.date.toISOString()).format("HH:mm"));
    }
  }

  ngOnInit() {
    this.editEntryDialogRef.updateSize('80%');

    formatDateField('date-start');
    formatDateField('date-end');
    formatTimeField('time-start');
    formatTimeField('time-end');
  }

  save(): void {
    const dateStart = moment(this.dateStart.value, "DD.MM.YYYY").format("YYYY-MM-DD");
    const dateEnd = moment(this.dateEnd.value, "DD.MM.YYYY").format("YYYY-MM-DD");

    const event = {
      id: this.id,
      title: this.title.value,
      start: new Date(dateStart + "T" + this.timeStart.value + ':00'),
      end: new Date(dateEnd + "T" + this.timeEnd.value + ':00'),
      color: { ...colors[this.color.value ?? ''] },
      meta: {
        details: this.details.value,
        colorId: this.color.value
      },
      resizable: {
        beforeStart: true,
          afterEnd: true,
      },
      draggable: true,
      allDay: this.allDay.value
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
