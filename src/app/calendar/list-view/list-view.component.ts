import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent {
  @Input() events: any[];
  @Output() eventClicked = new EventEmitter<any>();

  ngOnInit() {}

  onEventClick(event: any) {
    this.eventClicked.emit({ event: event });
  }
}
