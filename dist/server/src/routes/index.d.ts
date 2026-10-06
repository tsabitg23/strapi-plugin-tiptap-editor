declare const _default: {
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
export default _default;
