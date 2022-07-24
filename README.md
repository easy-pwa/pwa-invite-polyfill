# PWA Install Polyfill

Propose invitation and installation helper for browsers which does not support them (Firefox, iOS...).
Today, only Chrome and Edge browsers support the [BeforeInstallPromptEvent](https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent).
This library allows to get the same behaviour on some other browsers.

The PWA installation method depends of your brower.
When a user accepts the install invitation, a helper is showed to help him to install your application.

## Installation

Due to frequently behaviour changes in browsers, it is recommended to import the script with jsdeliver to have always the last version.

Copy this link in your html header.
``` html
<header>
...
    <script async src="https://cdn.jsdelivr.net/npm/easy-pwa/pwa-install-polyfill/lib.js"
...
</header>
```
