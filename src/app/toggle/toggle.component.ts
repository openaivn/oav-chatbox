import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { KEY_BAI_URL_CHATWIDGET, KEY_BAI_URL_CONV } from '@env/constants';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toggle" [class.active]="active" (click)="toggle()">
      <slot></slot>
    </div>
  `,
  styles: [`
    .toggle {
      padding:10px;
      border: solid black 1px;
      cursor: pointer;
      display: inline;
      user-select: none;
    }

    .active {
      background-color: lightsteelblue;
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ToggleComponent {

  @Input() active = false;
  @Output() change = new EventEmitter<boolean>();

  toggle(): void {
    this.active = !this.active;
    this.change.emit(this.active);
    if (this.active) {
      localStorage.setItem(KEY_BAI_URL_CONV, 'http://127.0.0.1:5000/bot');
      localStorage.setItem(KEY_BAI_URL_CHATWIDGET, 'http://127.0.0.1:5000/chat-widget');
    } else {
      localStorage.removeItem(KEY_BAI_URL_CONV);
      localStorage.removeItem(KEY_BAI_URL_CHATWIDGET);
    }
  }

}
