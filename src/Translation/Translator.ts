import lang from './definitions';

export default class Translator {
  private static readonly FALLBACK_LANG = 'en';

  private readonly lang: string;

  private translations: { [key: string]: { [key: string]: string } } = {};

  constructor() {
    this.lang = this.getLangName();
  }

  public translate(key: string, variables: { [key: string]: string } = {}): string {
    let translation = this.getValueByNestedKey(lang[this.lang], key) ?? this.getValueByNestedKey(lang[Translator.FALLBACK_LANG], key);
    if (!translation) {
      throw new Error('Translation not found');
    }

    for (const [parameterKey, parameterValue, ] of Object.entries(variables)) {
      translation = translation.replace(parameterKey, parameterValue);
    }

    return translation;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getValueByNestedKey(translations: any, nestedKey: string): undefined|string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentValue: any = translations;
    const keys: string[] = nestedKey.split('.');
    keys.forEach(key => {
      if (!(key in currentValue)) {
        return undefined;
      }

      currentValue = currentValue[key];
    });

    return currentValue;
  }

  private getLangName(): string {
    const [currentLang,] = navigator.language.split('-');
    return currentLang;
  }
}
