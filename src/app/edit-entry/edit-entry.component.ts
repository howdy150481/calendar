import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { ConfirmDialogComponent } from '../helper/confirm-dialog/confirm-dialog.component';
import moment from "moment";
import { v4 as uuid } from "uuid";
import { colors } from "../lib/colors";
import { formatDateField, formatTimeField } from "../lib/cleave";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertDialogComponent} from "../helper/alert-dialog/alert-dialog.component";

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
    details: new FormControl('', [Validators.required]),
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

      this.form.get('dateStart').setValue(moment(this.data.event.start.toISOString()).format("DD.MM.YYYY"));
      this.form.get('timeStart').setValue(moment(this.data.event.start.toISOString()).format("HH:mm"));
      this.form.get('dateEnd').setValue(moment(this.data.event.end.toISOString()).format("DD.MM.YYYY"));
      this.form.get('timeEnd').setValue(moment(this.data.event.end.toISOString()).format("HH:mm"));

      this.form.get('title').setValue(this.data.event.title);
      this.form.get('details').setValue(this.data.event.meta.details);
      this.form.get('allDay').setValue(this.data.event.allDay ?? false);
      this.form.get('color').setValue(this.data.event.meta.colorId);
    } else {
      this.id = uuid()

      this.form.get('dateStart').setValue(moment(this.data.date.toISOString()).format("DD.MM.YYYY"));
      this.form.get('timeStart').setValue(moment(this.data.date.toISOString()).format("HH:mm"));
      this.form.get('dateEnd').setValue(moment(this.data.date.toISOString()).format("DD.MM.YYYY"));
      this.form.get('timeEnd').setValue(moment(this.data.date.toISOString()).format("HH:mm"));
    }

    formatDateField('date-start');
    formatDateField('date-end');
    formatTimeField('time-start');
    formatTimeField('time-end');
  }

  save(): void {
    if (this.form.valid) {
      const dateStart = moment(this.form.get('dateStart').value, "DD.MM.YYYY").format("YYYY-MM-DD");
      const dateEnd = moment(this.form.get('dateEnd').value, "DD.MM.YYYY").format("YYYY-MM-DD");

      const event = {
        id: this.id,
        title: this.form.get('title').value,
        start: new Date(dateStart + "T" + this.form.get('timeStart').value + ':00'),
        end: new Date(dateEnd + "T" + this.form.get('timeEnd').value + ':00'),
        color: { ...colors[this.form.get('color').value] },
        meta: {
          details: this.form.get('details').value,
          colorId: this.form.get('color').value
        },
        resizable: {
          beforeStart: true,
            afterEnd: true,
        },
        draggable: true,
        allDay: this.form.get('allDay').value
      };

      this.saveEvent.emit(event);
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
