import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent {
  @Input() events: any[];

  @Output() eventClicked = new EventEmitter<any>();

  onEventClick(event: any) {
    let newEvent = { event: event }
    this.eventClicked.emit(newEvent);
  }
}
