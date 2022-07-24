import lang from './definitions';

export default class Translator {
  private static readonly FALLBACK_LANG = 'en';

  private readonly lang: string;

  private translations: { [key: string]: { [key: string]: string }; } = {};

  constructor() {
    this.lang = this.getLangName();
  }

  public translate(key: string, variables: { [key: string]: string } = {}): string
  {
    let translation = this.getValueByNestedKey(lang[this.lang], key) ?? this.getValueByNestedKey(lang[Translator.FALLBACK_LANG], key);
    if (!translation) {
      throw new Error('Translation not found');
    }

    for (const [key, value] of Object.entries(variables)) {
      translation = translation.replace(key, value);
    }

    return translation;
  }

  private getValueByNestedKey(translations: any, nestedKey: string): undefined|string
  {
    let currentValue: any = translations;//string|object|undefined = undefined;
    const keys: string[] = nestedKey.split('.');
    keys.forEach((key) => {
      if (! (key in currentValue)) {
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

