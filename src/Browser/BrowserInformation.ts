import { BrowserInfo, detect as BrowserDetect } from 'detect-browser';

export default new (class BrowserInformation {
  public getInfo(): BrowserInfo | null {
    const system = BrowserDetect();

    if (system?.type !== 'browser' || system.os === null) {
      return null;
    }

    return system;
  }
})();
