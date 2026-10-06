declare const _default: {
    preset: ({ strapi }: {
        strapi: import('@strapi/types/dist/core').Strapi;
    }) => {
        getConfig(): import('..').TiptapPluginConfig;
        listPresetNames(): string[];
        getPreset(name: string): import('..').TiptapPresetConfig | null;
    };
    theme: ({ strapi }: {
        strapi: import('@strapi/types/dist/core').Strapi;
    }) => {
        getTheme(): import('..').TiptapThemeConfig | undefined;
    };
};
export default _default;
