import { Core } from '@strapi/strapi';
import { Context } from 'koa';
declare const createThemeController: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    find(ctx: Context): Promise<void>;
};
export default createThemeController;
