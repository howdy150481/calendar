import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { ConfirmDialogComponent } from '../helper/confirm-dialog/confirm-dialog.component';
import moment from "moment";
import { v4 as uuid } from "uuid";
import { colors } from "../lib/colors";
import { formatDateField, formatTimeField } from "../lib/cleave";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertDialogComponent} from "../helper/alert-dialog/alert-dialog.component";
import CreateEvent from "../lib/CreateEvent";

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.scss']
})
export class EditEntryComponent {
  id: string;
  existingEvent: boolean = false;

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    details: new FormControl('', []),
    dateStart: new FormControl('', [Validators.required]),
    timeStart: new FormControl('', [Validators.required]),
    dateEnd: new FormControl('', [Validators.required]),
    timeEnd: new FormControl('', [Validators.required]),
    allDay: new FormControl(false),
    color: new FormControl('', [Validators.required])
  });

  colorOptions: any[] = Object.entries(colors);

  @Output() saveEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  constructor(
    public editEntryDialogRef: MatDialogRef<EditEntryComponent>,
    public matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.editEntryDialogRef.updateSize('80%');

    if(this.data.event !== undefined) {
      this.id = this.data.event.id;
      this.existingEvent = true;

      this.fillFormDateTimeForm(this.data.event.start, this.data.event.end);

      this.form.get('title').setValue(this.data.event.title);
      this.form.get('details').setValue(this.data.event.meta.details);
      this.form.get('allDay').setValue(this.data.event.allDay ?? false);
      this.form.get('color').setValue(this.data.event.meta.colorId);
    } else {
      this.id = uuid()

      this.fillFormDateTimeForm(this.data.date, this.data.date);
    }

    formatDateField('date-start');
    formatDateField('date-end');
    formatTimeField('time-start');
    formatTimeField('time-end');
  }

  fillFormDateTimeForm(start, end): void {
    this.form.get('dateStart').setValue(moment(start).format('DD.MM.YYYY'));
    this.form.get('timeStart').setValue(moment(start).format('HH:mm'));
    this.form.get('dateEnd').setValue(moment(end).format('DD.MM.YYYY'));
    this.form.get('timeEnd').setValue(moment(end).format('HH:mm'));
  }

  save(): void {
    if (this.form.valid) {
      const start = this.form.get('dateStart').value;
      const dateStart = moment(start, "DD.MM.YYYY").format("YYYY-MM-DD");
      const end = this.form.get('dateEnd').value
      const dateEnd = moment(end, "DD.MM.YYYY").format("YYYY-MM-DD");

      let createEvent = new CreateEvent();
      createEvent
        .setId(this.id)
        .setTitle(this.form.get('title').value)
        .setDetails(this.form.get('details').value)
        .setColor(this.form.get('color').value)
        .setDateStart(dateStart)
        .setTimeStart(this.form.get('timeStart').value)
        .setDateEnd(dateEnd)
        .setTimeEnd(this.form.get('timeEnd').value)
        .setAllDay(this.form.get('allDay').value);

      this.saveEvent.emit(createEvent.getEvent());
      this.editEntryDialogRef.close();
    } else {
      this.matDialog.open(AlertDialogComponent, {
        data: {
          title: "Fehler im Formular?",
          message: "Der Termin wurde nicht korrekt ausgefüllt"
        }
      });
    }
  }

  delete(): void {
    const confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
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
