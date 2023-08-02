import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chat-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './oav-chat-button.component.html',
  styleUrls: [
    './oav-chat-button.component.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class OAVChatButtonComponent {

  @Input() active = false;
  @Output() change = new EventEmitter<boolean>();
  @Input() name = '';

  activateChatbox: boolean = true;
  // @ViewChild('cmp', { static: false })
  // private chatbox!: BotScriptAIComponent;


  toggle(): void {
    this.active = !this.active;
    this.change.emit(this.active);

    // if (this.active) {
    //   this.chatbox.toggle();
    // }
  }

}
