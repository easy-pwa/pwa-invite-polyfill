import IOS_Safari_11_3 from './IOS_safari_11_3-';
import Android_firefox_100 from './Android_firefox_100-';
import Android_samsung_17_0 from './Android_samsung_17_0-';

const rules = [
  new Android_firefox_100(),
  new Android_samsung_17_0(),
  new IOS_Safari_11_3(),
];

export default rules;
