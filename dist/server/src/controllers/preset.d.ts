import { Core } from '@strapi/strapi';
import { Context } from 'koa';
declare const createPresetController: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    find(ctx: Context): Promise<void>;
    findOne(ctx: Context): Promise<void>;
};
export default createPresetController;
