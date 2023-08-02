import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  LOG_LEVEL: NgxLoggerLevel.INFO,
  CHAT_WIDGET_URL: 'http://127.0.0.1:5000/chat-widget',
  BOT_CONV_URL: 'http://127.0.0.1:5000/bot',
};
