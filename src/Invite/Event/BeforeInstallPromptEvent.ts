export default class BeforeInstallPromptEvent extends CustomEvent<BeforeInstallPromptEvent> {
    public readonly platforms: string[] = ['web'];

    public readonly userChoice: Promise<BeforeInstallPromptEventUserChoice>;

    readonly #userChoicePromiseResolver: Function;
    readonly #preventDefaultHandler: Function;

    constructor(
        userChoicePromise: Promise<BeforeInstallPromptEventUserChoice>,
        userChoicePromiseResolver: Function,
        preventDefaultHandler: Function
    ) {
        super('beforeinstallprompt');

        this.userChoice = userChoicePromise;
        this.#userChoicePromiseResolver = userChoicePromiseResolver;
        this.#preventDefaultHandler = preventDefaultHandler;
    }

    public prompt(): Promise<void>
    {
        this.#userChoicePromiseResolver();
        return Promise.resolve();
    }

    public preventDefault(): void
    {
        this.#preventDefaultHandler();
    }
}
