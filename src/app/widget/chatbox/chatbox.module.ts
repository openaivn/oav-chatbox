import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatboxComponent } from '@app/widget/chatbox/chatbox.component';
import { ChatRequetService } from '@app/widget/chatbox/request/ChatRequest.service';
import { GuidService } from '@app/widget/chatbox/request/guid.service';
// import { LoggerModule } from "ngx-logger";

@NgModule({
  declarations: [
    ChatboxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ChatboxComponent,
  ],
  providers: [
    ChatRequetService,
    GuidService,
  ],
})
export class ChatboxModule {
}
