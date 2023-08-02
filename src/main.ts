// main.ts

import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { OAVChatButtonComponent } from '@app/oav-chat-button/oav-chat-button.component';
import { OAVInfoComponent } from '@app/oav-info/oav-info.component';
import { BotScriptAIComponent } from '@app/widget/botscript-ai.component';


(async () => {

  const app = await createApplication({
    providers: [
      /* your global providers here */
    ],
  });

  // main widget
  const botscriptAIElement = createCustomElement(
    BotScriptAIComponent,
    {
      injector: app.injector,
    }
  );

  const oavChatButtonElement = createCustomElement(
    OAVChatButtonComponent,
    {
      injector: app.injector,
    }
  )

  // other stub
  const oavInfoElement = createCustomElement(OAVInfoComponent, {
    injector: app.injector,
  });

  customElements.define('botscript-ai', botscriptAIElement);
  customElements.define('oav-info', oavInfoElement);
  customElements.define('oav-chat-button', oavChatButtonElement);
  try {
    if (!document?.querySelector('botscript-ai[name]')) {
      var botName = document?.querySelector('script[data-botscript="autoInject"][data-name]')
        ?.getAttribute('data-name');
      if (!botName) {
        return;
      }
      console.info('Insert bot widget!', botName);
      const botNodeElement = document.createElement('botscript-ai');
      botNodeElement.setAttribute('name', botName);
      document.body.append(botNodeElement);
    }
  } catch (error) {
    console.error('Unable to inject botscript widget!', error);
  }
})();
