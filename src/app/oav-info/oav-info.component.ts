import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { KEY_BAI_URL_CHATWIDGET, KEY_BAI_URL_CONV, KEY_OAV_API_ENDPOINT, KEY_OAV_API_KEY } from '@env/constants';

@Component({
  selector: 'app-oav-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toggle" [class.active]="active" (click)="toggle()">
      <slot></slot>
    </div>
    <h2>API Info</h2>
    <ul>
      <li>Endpoint: {{OAV_API_ENDPOINT}}</li>
      <li>Key: {{OAV_API_KEY}}</li>
      <li>Dev Mode: {{active}}</li>
    </ul>
  `,
  styles: [`
    .toggle {
      padding:10px;
      border: solid black 1px;
      cursor: pointer;
      display: inline-block;
      user-select: none;
    }

    .active {
      background-color: lightsteelblue;
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class OAVInfoComponent {

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

  get OAV_API_ENDPOINT() {
    return localStorage.getItem(KEY_OAV_API_ENDPOINT) || 'https://api.openai.vn/v1/chat/completions' as string;
  }

  get OAV_API_KEY() {
    return localStorage.getItem(KEY_OAV_API_KEY) || 'Get one at https://botscript.openai.vn/#/Account/api-keys' as string;
  }

}
