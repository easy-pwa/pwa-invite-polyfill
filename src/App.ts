import { detect as BrowserDetect } from 'detect-browser';
import WebManifest from 'web-manifest-reader/dist/src/Model/WebManifest';
import Context from './Context/Context';
import RuleFinder from './Helper/Rule/RuleFinder';
import Translator from './Translation/Translator';
import HelperRenderer from './Helper/Render/HelperRenderer';
import BeforeInstallPromptEvent from './Invite/Event/BeforeInstallPromptEvent';
import BannerInvite from './Invite/BannerInvite';
import AppInfoCollector from './App/AppInfoCollector';

export default new (class App {
  private static readonly KEY_STORAGE_INVITATION = 'pwa-invitation-polyfill';

  private static readonly MIN_DAYS_BETWEEN_INVITATION = 15;

  appInfoCollector: AppInfoCollector = new AppInfoCollector();

  manifest!: WebManifest;

  ruleFinder: RuleFinder;

  translator: Translator;

  renderer: HelperRenderer;

  bannerInvite: BannerInvite;

  installUserChoice: Promise<{
    outcome: 'accepted' | 'dismissed' | undefined;
    platform: string;
  }>;

  installUserChoiceResult!: Function;

  constructor() {
    this.ruleFinder = new RuleFinder();
    this.translator = new Translator();
    this.renderer = new HelperRenderer();
    this.bannerInvite = new BannerInvite(this.translator);

    this.installUserChoice = new Promise<{outcome: undefined; platform: string}>(resolve => {
      this.installUserChoiceResult = resolve;
    });
  }

  public async start(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    await navigator.serviceWorker.ready;

    if (!this.isEligibleToInvite()) {
      return;
    }

    const browserInfo = BrowserDetect();
    if (browserInfo === null || browserInfo.type !== 'browser' || browserInfo.os === null) {
      return;
    }

    const appInfo = await this.appInfoCollector.getAppInfo();

    const context = new Context(appInfo, browserInfo.os, browserInfo.name, parseFloat(browserInfo.version));
    const htmlHelperTemplate = this.ruleFinder.getHelperTemplate(context, this.translator);

    if (htmlHelperTemplate !== null) {
      this.triggerInvite(context, htmlHelperTemplate);
    }
  }

  triggerInvite(context: Context, htmlHelperTemplate: string): void {
    let userChoicePromiseResolver: Function = () => {};
    const userChoicePromise = new Promise<BeforeInstallPromptEventUserChoice>(resolve => {
      userChoicePromiseResolver = () => {
        this.renderer.createHelperPopup(htmlHelperTemplate);
        this.inviteProcessed();
        resolve({ outcome: 'accepted', platform: 'web' });
      };
    });

    this.bannerInvite.trigger(
      context.app.shortName,
      context.app.icon,
      userChoicePromiseResolver,
      () => { this.inviteProcessed(); }
    );
    this.dispatchBeforeInstallPromptEvent(userChoicePromise, userChoicePromiseResolver);
  }

  dispatchBeforeInstallPromptEvent(
    userChoicePromise: Promise<BeforeInstallPromptEventUserChoice>,
    userChoicePromiseResolver: Function
  ): void {
    window.dispatchEvent(new BeforeInstallPromptEvent(
      userChoicePromise,
      userChoicePromiseResolver,
      () => { this.bannerInvite.cancel(); }
    ));
  }

  inviteProcessed(): void {
    localStorage.setItem(App.KEY_STORAGE_INVITATION, new Date().toDateString());
  }

  isEligibleToInvite(): boolean {
    if (this.isAppMode()) {
      return false;
    }

    const lastInvitationAnswered = localStorage.getItem(App.KEY_STORAGE_INVITATION);
    if (lastInvitationAnswered !== null) {
      const dateLastInvitationAnswered = new Date(lastInvitationAnswered);
      const diffDay = (new Date().getTime() - dateLastInvitationAnswered.getTime()) / 1000 / 86400;
      if (diffDay < App.MIN_DAYS_BETWEEN_INVITATION) {
        return false;
      }
    }

    return true;
  }

  isAppMode(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches
        || ('standalone' in window.navigator && (window.navigator as WindowNavigator).standalone === true)
    );
  }
})();
