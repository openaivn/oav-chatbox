import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChatRequetService } from '@app/chatbox/request/ChatRequest.service';
// import { NGXLogger } from "ngx-logger";
import { ChatConfig } from './chat-config';
import { ChatMessage } from './chat-message';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: [
    './chatbox.component.scss',
    './media/responsive.scss',
    './media/btn-dropdown.scss',
    './media/host.scss',
  ],
  styles: [
    `@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');`,
  ]
})
export class ChatboxComponent {

  @ViewChild('autoScroll', { static: true })
  private myScrollContainer!: ElementRef;
  @Input() chatConfig: ChatConfig = {
    title: 'Chatbox',
    subTitle: 'Voice inteface for online Help Desk!',
    botName: 'demo',
    typingMode: true,
  };
  @Input() set serverResponse(value: string) {
    this.addServerResponse(value);
  }
  @Input() set serverResponseUpdate(value: string) {
    this.updateServerResponse(value);
  }
  @Output() onMessageInput: EventEmitter<any> = new EventEmitter<any>();

  messages: ChatMessage[] = [];
  taskDone: boolean = false;
  lastReplyText!: string;
  lastUpdatedAt!: Date;
  activeBtnDropdown!: boolean;

  constructor(
    // private logger: NGXLogger,
    private svChatRequest: ChatRequetService,
  ) {

  }

  userMessage = '';
  @Input() isModalActive = false;
  @Output() isModalActiveChange = new EventEmitter<boolean>();
  isBotActive = false;
  ngOnInit(): void {
    this.messages = [{
      type: 'bot',
      message: 'Xin chào, tôi có thể giúp gì cho bạn?'
    }];
    this.svChatRequest.getConvById(this.chatConfig.botName)
      .subscribe({
        next: (value) => {
          this.taskDone = value.taskDone;
          this.lastReplyText = value.lastReplyText;
          this.lastUpdatedAt = value.updatedAt;
          this.chatConfig.title = value.name || this.chatConfig.title;
          this.chatConfig.subTitle = value.note || this.chatConfig.subTitle;
          if (value.data.length > 0) {
            this.messages = value.data.reverse().map(x => ({
              type: x.role === 'user' ? 'user' : 'bot',
              message: x.text
            }));
            this.scrollToBottom();
          } else {
            this.messages = [{
              type: 'bot',
              message: 'Xin chào, tôi có thể giúp gì cho bạn?'
            }];
          }
        }
      })
  }

  showDialog() {
    this.isModalActive = true;
  }
  closeDialog() {
    this.activeBtnDropdown = false;
    this.isModalActive = false;
  }

  pushData(message: string) {
    if (message.trim() != '') {
      this.onMessage(this.userMessage);
      this.messages.push({ type: 'user', message });
      this.userMessage = '';
      this.isBotActive = true;
      this.scrollToBottom();
    }
  }

  addServerResponse(serverResponse: string) {
    if (serverResponse) {
      // this.logger.info('Add server response: ', serverResponse);
      this.messages.push({ type: 'bot', message: serverResponse });
      console.info('Add server response: ', serverResponse, this.messages);
      this.isBotActive = false;
      this.scrollToBottom();
    }
  }

  updateServerResponse(serverResponseUpdate: string) {
    const msg = this.messages.at(-1);
    if (msg) {
      msg.message = serverResponseUpdate;
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    try {
      setTimeout(() => {
        this.myScrollContainer.nativeElement.scrollTop =
          32 + this.myScrollContainer.nativeElement.scrollHeight;
        this.myScrollContainer.nativeElement.scroll({
          top: this.myScrollContainer.nativeElement.scrollHeight,
          left: 0,
          behavior: 'smooth',
        });
      }, 100);
    } catch (err) { }
  }

  public onMessage(date: any): void {
    this.onMessageInput.emit(date.trim());
  }

  public newConv() {
    this.svChatRequest.removeConvId();
    this.ngOnInit(); // khởi tạo lại từ đầu.
  }
}
