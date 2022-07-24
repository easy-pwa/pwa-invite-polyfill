import AppInfo from '../App/AppInfo';

export default class {
    public readonly app: AppInfo;

    public readonly os: string;

    public readonly browserName: string;

    public readonly browserVersion: number;

    constructor(app: AppInfo, os: string, browserName: string, browserVersion: number) {
      this.app = app;
      this.os = os;
      this.browserName = browserName;
      this.browserVersion = browserVersion;
    }
}
