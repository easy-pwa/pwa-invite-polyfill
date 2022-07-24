import AppInfo from "./AppInfo";
import Manifest, {WebManifest, WebManifestIcon} from "web-manifest-reader";

export default class {
    public async getAppInfo(): Promise<AppInfo> {
        const manifest = await Manifest.read();
        if (null === manifest || !manifest.short_name || !manifest.name || !manifest.icons) {
            throw new Error('Devra être corrigée dans la lib web manifest reader');
        }

        return new AppInfo(manifest.short_name, manifest.name, this.getIconPath(manifest.icons))
    }

    private getIconPath(icons: WebManifestIcon[]): string {
        const icon = icons[0];
        if (!icon.src) {
            throw new Error('Impossible to get the icon path.');
        }
        return icon.src;
    }
}
