import { TiptapPresetConfig } from '../../../shared/types';
declare const config: {
    default: {
        presets: Record<string, TiptapPresetConfig>;
    };
    validator(pluginConfig: unknown): void;
};
export default config;
