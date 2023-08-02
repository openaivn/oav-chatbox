import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuidService } from '@app/widget/chatbox/request/guid.service';
import { KEY_BAI_IDCONV, KEY_BAI_URL_CHATWIDGET, KEY_BAI_URL_CONV } from '@env/constants';
import { environment } from '@env/environment';
import { tap } from 'rxjs';
import { ChatReponse } from './ChatResponse.model';

@Injectable()
export class ChatRequetService {
  constructor(
    private http: HttpClient,
    private svGuid: GuidService,
  ) {
  }

  /**
   * Mã định danh hộp thoại
   */
  get idConv() {
    // TODO: Move to cookie storage
    const idConv = localStorage.getItem(KEY_BAI_IDCONV) as string;
    if (!idConv) {
      const idConvNew = this.svGuid.newGuid();
      localStorage.setItem(KEY_BAI_IDCONV, idConvNew);
      return idConvNew;
    }
    return idConv;
  }

  /**
   * ConvUrl: support dev url.
   */
  get botConvUrl() {
    const convUrl = localStorage.getItem(KEY_BAI_URL_CONV) as string || environment.BOT_CONV_URL;
    return convUrl;
  }

  /**
   * WidgetUrl: support dev url.
   */
  get chatWidgetUrl() {
    const convUrl = localStorage.getItem(KEY_BAI_URL_CHATWIDGET) as string || environment.CHAT_WIDGET_URL;
    return convUrl;
  }

  getConvById(bot: string, id?: string) {
    const vRequestUrl = `${this.botConvUrl}/${bot}/conv`;
    const idConv = id || this.idConv as string;
    return this.http.get<{
      updatedAt: Date,
      lastReplyText: string,
      taskDone: boolean,
      data: ChatReponse[]
    }>(vRequestUrl, {
      params: {
        idConv
      },
    });
  }

  /**
   * TODO: remove in cookie
   */
  removeConvId() {
    localStorage.removeItem(KEY_BAI_IDCONV);
  }

  chat(bot: string, text: string) {
    const vRequestUrl = `${this.chatWidgetUrl}/${bot}`;
    const idConv = this.idConv;
    return this.http.post<ChatReponse>(vRequestUrl, {
      id: bot,
      text,
      idConv,
      from: {
        id: 123456,
      }
    })
      .pipe(
        tap(x => {
          localStorage.setItem(KEY_BAI_IDCONV, x.idConv);
        })
      );
  }

  async chatTyping(bot: string, text: string) {
    const vRequestUrl = `${this.chatWidgetUrl}/${bot}`;
    const idConv = this.idConv;
    const response = await fetch(vRequestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: bot,
        text,
        idConv,
        stream: true,
        from: {
          id: 123456,
        }
      }),
    });
    return response;
  }
}
