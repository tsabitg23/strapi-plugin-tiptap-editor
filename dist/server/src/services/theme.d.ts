import { Core } from '@strapi/strapi';
import { TiptapThemeConfig } from '../../../shared/types';
declare const createThemeService: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    getTheme(): TiptapThemeConfig | undefined;
};
export default createThemeService;
