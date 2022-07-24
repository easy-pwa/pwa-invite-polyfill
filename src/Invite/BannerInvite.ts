import Translator from '../Translation/Translator';

export default class {
    private inviteReference?: number;

    constructor(private translator: Translator) {
    }

    trigger(shortName: string, icon: string, acceptHandler: Function, refuseHandler: Function): void {
      this.inviteReference = window.setTimeout(() => {
        const htmlTemplate = this.template(shortName, icon);
        this.show(htmlTemplate, acceptHandler, refuseHandler);
      }, 2000);
    }

    cancel(): void {
      if (this.inviteReference) {
        clearTimeout(this.inviteReference);
        this.inviteReference = undefined;
      }
    }

    show(htmlTemplate: string, acceptHandler: Function, refuseHandler: Function): void {
      const popupContent = document.createElement('div');
      popupContent.classList.add('pwa-homescreen-invite');
      popupContent.innerHTML = htmlTemplate;

      const closeInvite = (): void => {
            document.getElementsByClassName('pwa-homescreen-invite')[0]?.remove();
      };

      document.body.appendChild(popupContent);
        document.getElementById('pwa-homescreen-dismiss')?.addEventListener('click', () => { refuseHandler(); closeInvite(); });
        document.getElementById('pwa-homescreen-accept')?.addEventListener('click', () => { acceptHandler(); closeInvite(); });
        popupContent.classList.add('pwa-homescreen-invite-active');
    }

    private template(shortName: string, icon: string): string {
      return `
            <div id="pwa-homescreen-icon"><img alt="${shortName}" src="${icon}" /></div>
            <div id="pwa-homescreen-accept">${this.translator.translate('invite', { '%name%': shortName })}</div>
            <div id="pwa-homescreen-dismiss">
                <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"/></svg>
            </div>
        `;
    }
}
