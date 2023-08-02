import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-btn-toggle',
  standalone: true,
  imports: [
    CommonModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './btn-toggle.component.html',
  styleUrls: [
    './btn-toggle.component.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BtnToggleComponent {

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
