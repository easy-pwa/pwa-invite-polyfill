export default class HelperRenderer {

    public createHelperPopup(htmlTemplate: string): void {
        const popupContent = document.createElement('div');
        popupContent.classList.add('pwa-homescreen-helper');
        popupContent.innerHTML = `
            <h1>Installer l\'application</h1>
            <div class="message">${htmlTemplate}</div>
            <div class="button">C'est fait !</div>
        `;


        const mask = document.createElement('div');
        mask.classList.add('pwa-homescreen-helper-mask');

        const closeHelper = (): void => {
            document.body.classList.remove('pwa-helper-active');

            document.getElementsByClassName('pwa-homescreen-helper')[0]?.remove();
            document.getElementsByClassName('pwa-homescreen-helper-mask')[0]?.remove();
        };

        popupContent.addEventListener('click', closeHelper);
        //window.setTimeout(closeHelper, 12000);

        document.body.appendChild(popupContent);
        document.body.appendChild(mask);

        document.body.classList.add('pwa-helper-active');
    }

}
