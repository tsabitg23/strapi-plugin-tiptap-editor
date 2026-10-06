declare const _default: {
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
export default _default;
