import RuleInterface from '../RuleInterface';
import Translator from '../../../Translation/Translator';
import Context from '../../../Context/Context';
import DotMenuIcon from '../../../../resource/icons/dot_menu.svg';

export default class implements RuleInterface {
  support(context: Context): boolean {
    return context.os === 'Android OS' && context.browserName === 'firefox' && context.browserVersion >= 100.0;
  }

  template(translator: Translator): string {
    return `
            <div>
                ${translator.translate('helper.introduction')}, ${translator.translate('press_on')}
                ${DotMenuIcon}
                ${translator.translate('then')} <q>${translator.translate('helper.firefox.label')}</q>.
            </div>
        `;
  }
}
