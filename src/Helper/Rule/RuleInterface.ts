import Context from '../../Context/Context';
import Translator from '../../Translation/Translator';

export default interface RuleInterface {
    support(context: Context): boolean;

    template(translator: Translator): string;
}
