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
  template: `
    <div class="toggle" [class.active]="active" (click)="toggle()">
      <span #wrapper>
        <ng-content></ng-content>
      </span>
      <span *ngIf="!wrapper.childNodes.length">💬</span>
    </div>
    <botscript-ai class="ai-chatbox" [name]="name" [active]="true"></botscript-ai>
  `,
  styles: [`
    .toggle {
      /*
      padding:10px;
      border: solid black 1px;
      */
      cursor: pointer;
      display: inline;
      user-select: none;
    }

    .active {
      /* background-color: lightsteelblue; */
      color: lightsteelblue;
      text-shadow: 1px 1px green;
    }

    .ai-chatbox {
      display: none
    }

    .toggle.active + botscript-ai {
      display: block;
    }
  `],
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
