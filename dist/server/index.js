"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const bootstrap = ({ strapi }) => {
};
const destroy = ({ strapi }) => {
};
const PLUGIN_ID = "tiptap-editor";
const RICH_TEXT_FIELD_NAME = "RichText";
const richTextField = {
  name: RICH_TEXT_FIELD_NAME,
  plugin: PLUGIN_ID,
  type: "text",
  inputSize: {
    default: 12,
    isResizable: true
  }
};
const register = ({ strapi }) => {
  strapi.customFields.register(richTextField);
};
const PRESET_FEATURE_KEYS = [
  "bold",
  "italic",
  "strike",
  "underline",
  "code",
  "codeBlock",
  "blockquote",
  "bulletList",
  "orderedList",
  "hardBreak",
  "horizontalRule",
  "history",
  "heading",
  "link",
  "table",
  "textAlign",
  "superscript",
  "subscript",
  "textColor",
  "highlightColor",
  "mediaLibrary"
];
const MINIMAL_PRESET_CONFIG = {
  bold: true,
  italic: true
};
const isPlainObject$1 = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};
const isFeatureEnabled = (value) => {
  if (value === void 0) {
    return false;
  }
  if (typeof value === "boolean") {
    return value;
  }
  if (!isPlainObject$1(value)) {
    return false;
  }
  const obj = value;
  if (typeof obj.enabled === "boolean") {
    return obj.enabled;
  }
  if (typeof obj.disabled === "boolean") {
    return !obj.disabled;
  }
  return true;
};
const getFeatureOptions = (value, defaults) => {
  if (value === false) {
    return null;
  }
  if (!isPlainObject$1(value)) {
    return defaults;
  }
  const { enabled: _e, disabled: _d, ...rest } = value;
  return { ...defaults, ...rest };
};
const isPlainObject = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};
const FEATURE_KEYS = new Set(PRESET_FEATURE_KEYS);
const THEME_KEYS = /* @__PURE__ */ new Set(["colors", "css", "stylesheet"]);
const COLOR_VALUE_RE = /^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})|rgba?\([^)]+\)|hsla?\([^)]+\)|var\(--[^)]+\))$/;
const isValidColorValue = (value) => COLOR_VALUE_RE.test(value.trim());
const getInvalidKeys = (presetConfig) => {
  if (!isPlainObject(presetConfig)) return [];
  return Object.keys(presetConfig).filter(
    (key) => !FEATURE_KEYS.has(key)
  );
};
const config = {
  default: {
    presets: {}
  },
  validator(pluginConfig) {
    if (!isPlainObject(pluginConfig)) {
      throw new Error("tiptap-editor plugin config must be a plain object");
    }
    const typedConfig = pluginConfig;
    const { presets, theme } = typedConfig;
    if (presets !== void 0) {
      if (!isPlainObject(presets)) {
        throw new Error("tiptap-editor config.presets must be a plain object");
      }
      const allInvalidKeys = [];
      for (const [presetName, presetConfig] of Object.entries(
        presets
      )) {
        if (!isPlainObject(presetConfig)) {
          throw new Error(
            `tiptap-editor config.presets.${presetName} must be a plain object, got ${typeof presetConfig}`
          );
        }
        const invalidKeys = getInvalidKeys(presetConfig);
        if (invalidKeys.length > 0) {
          allInvalidKeys.push(...invalidKeys);
        }
      }
      if (allInvalidKeys.length > 0) {
        throw new Error(
          `tiptap-editor config.presets contains invalid feature keys: ${allInvalidKeys.join(", ")}. Allowed keys: ${PRESET_FEATURE_KEYS.join(", ")}`
        );
      }
    }
    if (theme !== void 0) {
      if (!isPlainObject(theme)) {
        throw new Error("tiptap-editor config.theme must be a plain object");
      }
      for (const key of Object.keys(theme)) {
        if (!THEME_KEYS.has(key)) {
          throw new Error(
            `tiptap-editor config.theme has unknown key: "${key}". Allowed keys: colors, stylesheet`
          );
        }
      }
      const { stylesheet, css, colors } = theme;
      if (stylesheet !== void 0 && typeof stylesheet !== "string") {
        throw new Error("tiptap-editor config.theme.stylesheet must be a string");
      }
      if (css !== void 0 && typeof css !== "string") {
        throw new Error("tiptap-editor config.theme.css must be a string");
      }
      if (stylesheet !== void 0 && css !== void 0) {
        throw new Error('tiptap-editor config.theme: provide either "stylesheet" or "css", not both');
      }
      if (colors !== void 0) {
        if (!Array.isArray(colors)) {
          throw new Error("tiptap-editor config.theme.colors must be an array");
        }
        for (let i = 0; i < colors.length; i++) {
          const entry = colors[i];
          if (!isPlainObject(entry)) {
            throw new Error(
              `tiptap-editor config.theme.colors[${i}] must be a plain object`
            );
          }
          for (const key of Object.keys(entry)) {
            if (key !== "label" && key !== "color") {
              throw new Error(
                `tiptap-editor config.theme.colors[${i}] has unknown key: "${key}". Allowed keys: label, color`
              );
            }
          }
          if (typeof entry.label !== "string") {
            throw new Error(
              `tiptap-editor config.theme.colors[${i}].label must be a string`
            );
          }
          if (typeof entry.color !== "string") {
            throw new Error(
              `tiptap-editor config.theme.colors[${i}].color must be a string`
            );
          }
          if (!isValidColorValue(entry.color)) {
            throw new Error(
              `tiptap-editor config.theme.colors[${i}] has invalid color value: "${entry.color}". Accepted formats: hex (#rgb, #rrggbb, #rrggbbaa), rgb(), rgba(), hsl(), hsla(), var(--name)`
            );
          }
        }
      }
    }
  }
};
const contentTypes = {};
const createPresetController = ({ strapi }) => ({
  async find(ctx) {
    const presetService = strapi.plugin("tiptap-editor").service("preset");
    ctx.body = { presets: presetService.listPresetNames() };
  },
  async findOne(ctx) {
    const raw = ctx.params?.name;
    if (typeof raw !== "string") {
      ctx.throw(400, "Preset name is required");
      return;
    }
    const presetName = raw.trim();
    if (presetName.length === 0 || !/^[\w-]+$/.test(presetName)) {
      ctx.throw(400, "Invalid preset name");
      return;
    }
    const presetService = strapi.plugin("tiptap-editor").service("preset");
    const preset = presetService.getPreset(presetName);
    ctx.body = preset ?? MINIMAL_PRESET_CONFIG;
  }
});
const createThemeController = ({ strapi }) => ({
  async find(ctx) {
    const themeService = strapi.plugin("tiptap-editor").service("theme");
    ctx.body = themeService.getTheme() ?? {};
  }
});
const controllers = {
  preset: createPresetController,
  theme: createThemeController
};
const middlewares = {};
const policies = {};
const routes = {
  "preset-routes": {
    type: "admin",
    routes: [
      {
        method: "GET",
        path: "/presets",
        handler: "preset.find",
        config: { policies: [], middlewares: [] }
      },
      {
        method: "GET",
        path: "/presets/:name",
        handler: "preset.findOne",
        config: { policies: [], middlewares: [] }
      }
    ]
  },
  "theme-routes": {
    type: "admin",
    routes: [
      {
        method: "GET",
        path: "/theme",
        handler: "theme.find",
        config: { policies: [], middlewares: [] }
      }
    ]
  }
};
const DEFAULT_CONFIG$1 = { presets: {} };
const createPresetService = ({ strapi }) => ({
  getConfig() {
    return strapi.config.get("plugin::tiptap-editor", DEFAULT_CONFIG$1);
  },
  listPresetNames() {
    return Object.keys(this.getConfig().presets || {});
  },
  getPreset(name) {
    const presets = this.getConfig().presets || {};
    return presets[name] ?? null;
  }
});
const DEFAULT_CONFIG = { presets: {} };
const createThemeService = ({ strapi }) => ({
  getTheme() {
    const cfg = strapi.config.get("plugin::tiptap-editor", DEFAULT_CONFIG);
    return cfg.theme;
  }
});
const services = {
  preset: createPresetService,
  theme: createThemeService
};
const index = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  contentTypes,
  policies,
  middlewares
};
exports.MINIMAL_PRESET_CONFIG = MINIMAL_PRESET_CONFIG;
exports.PRESET_FEATURE_KEYS = PRESET_FEATURE_KEYS;
exports.default = index;
exports.getFeatureOptions = getFeatureOptions;
exports.isFeatureEnabled = isFeatureEnabled;
