import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ChatConfig } from '@app/widget/chatbox/chat-config';
import { ChatboxModule } from '@app/widget/chatbox/chatbox.module';
import { ChatRequetService } from '@app/widget/chatbox/request/ChatRequest.service';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [
    CommonModule,
    ChatboxModule,
  ],
  templateUrl: './botscript-ai.component.html',
  styleUrls: [
    './botscript-ai.component.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BotScriptAIComponent {

  @Input() active = false;
  @Output() activeChange = new EventEmitter<boolean>();
  @Input() typing = true;
  @Input() name = '';
  @Input() token = '';
  @Input() title = 'ChatBox';
  @Input() subtitle = 'Voice inteface for online Help Desk!';
  response: string = '';
  responseUpdate: string = '';
  config!: ChatConfig;

  constructor(
    private svChatRequest: ChatRequetService,
  ) {
  }

  ngOnInit() {
    this.config = {
      botName: this.name,
      title: this.title,
      subTitle: this.subtitle,
      typingMode: this.typing,
    }
  }

  toggle(): void {
    this.active = !this.active;
    this.activeChange.emit(this.active);
  }

  async getMessage(message: string) {
    if (!this.config.typingMode) {
      this.svChatRequest.chat(this.name, message)
        .subscribe({
          next: (res) => {
            this.response = res.text;
          },
          error: (err) => {
            console.error('Error: ', err);
          }
        });
      return;
    }
    const response = await this.svChatRequest.chatTyping(this.name, message);
    // Display the assistant's response in chunks
    let assistantResponse = "";
    this.response = 'Typing...';

    // ... (Rest of the code for reading and displaying responses)
    const reader = response.body!.getReader();
    const textDecoder = new TextDecoder("utf-8");

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      assistantResponse += textDecoder.decode(value, { stream: !done });
      this.responseUpdate = assistantResponse;
    }
    // reset next.
    this.response = '';
  }

}
