declare const _default: {
    readonly register: ({ strapi }: {
        strapi: import('@strapi/types/dist/core').Strapi;
    }) => void;
    readonly bootstrap: ({ strapi }: {
        strapi: import('@strapi/types/dist/core').Strapi;
    }) => void;
    readonly destroy: ({ strapi }: {
        strapi: import('@strapi/types/dist/core').Strapi;
    }) => void;
    readonly config: {
        default: {
            presets: Record<string, import('../../shared/types').TiptapPresetConfig>;
        };
        validator(pluginConfig: unknown): void;
    };
    readonly controllers: {
        preset: ({ strapi }: {
            strapi: import('@strapi/types/dist/core').Strapi;
        }) => {
            find(ctx: import('koa').Context): Promise<void>;
            findOne(ctx: import('koa').Context): Promise<void>;
        };
        theme: ({ strapi }: {
            strapi: import('@strapi/types/dist/core').Strapi;
        }) => {
            find(ctx: import('koa').Context): Promise<void>;
        };
    };
    readonly routes: {
        'preset-routes': {
            type: "admin";
            routes: {
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: any[];
                    middlewares: any[];
                };
            }[];
        };
        'theme-routes': {
            type: "admin";
            routes: {
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: any[];
                    middlewares: any[];
                };
            }[];
        };
    };
    readonly services: {
        preset: ({ strapi }: {
            strapi: import('@strapi/types/dist/core').Strapi;
        }) => {
            getConfig(): import('../../shared/types').TiptapPluginConfig;
            listPresetNames(): string[];
            getPreset(name: string): import('../../shared/types').TiptapPresetConfig | null;
        };
        theme: ({ strapi }: {
            strapi: import('@strapi/types/dist/core').Strapi;
        }) => {
            getTheme(): import('../../shared/types').TiptapThemeConfig | undefined;
        };
    };
    readonly contentTypes: {};
    readonly policies: {};
    readonly middlewares: {};
};
export default _default;
/**
 * [ERROR]  server/src/index.ts:19:1 - TS2742: The inferred type of 'default' cannot be named without a reference to '@strapi/core/node_modules/@strapi/types/dist/core'. This is likely not portable. A type annotation is necessary.
 */
export type { TiptapPresetConfig, TiptapPluginConfig, TiptapThemeConfig, ThemeColorEntry } from '../../shared/types';
export { PRESET_FEATURE_KEYS, MINIMAL_PRESET_CONFIG, isFeatureEnabled, getFeatureOptions, } from '../../shared/types';
