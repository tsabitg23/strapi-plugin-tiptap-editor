import { Core } from '@strapi/strapi';
import { TiptapPluginConfig, TiptapPresetConfig } from '../../../shared/types';
declare const createPresetService: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    getConfig(): TiptapPluginConfig;
    listPresetNames(): string[];
    getPreset(name: string): TiptapPresetConfig | null;
};
export default createPresetService;
