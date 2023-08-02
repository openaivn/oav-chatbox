// main.ts

import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { BtnToggleComponent } from '@app/btn-toggle/btn-toggle.component';
import { ToggleComponent } from '@app/toggle/toggle.component';
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

  const btnToggleWidgetElement = createCustomElement(
    BtnToggleComponent,
    {
      injector: app.injector,
    }
  )

  // other stub
  const toogleElement = createCustomElement(ToggleComponent, {
    injector: app.injector,
  });

  customElements.define('botscript-ai', botscriptAIElement);
  customElements.define('my-toggle', toogleElement);
  customElements.define('btn-botscript-ai', btnToggleWidgetElement);
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
