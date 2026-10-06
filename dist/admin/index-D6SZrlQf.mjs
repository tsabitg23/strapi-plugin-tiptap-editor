import { useRef, useEffect, useState } from "react";
import { useFetchClient } from "@strapi/strapi/admin";
import { jsx } from "react/jsx-runtime";
import { SingleSelect, SingleSelectOption } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { Paragraph } from "@strapi/icons";
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const PLUGIN_ID = "tiptap-editor";
let cache = null;
function setThemeCache(theme) {
  cache = theme;
}
function getThemeCache() {
  return cache;
}
const THEME_STYLE_ID = "tiptap-theme-styles";
function reconcileThemeStyles(theme) {
  const existing = document.getElementById(THEME_STYLE_ID);
  const { stylesheet, css } = theme;
  if (!stylesheet && !css) {
    existing?.remove();
    return Promise.resolve();
  }
  if (css) {
    if (existing && existing.tagName === "STYLE" && existing.textContent === css) {
      return Promise.resolve();
    }
    existing?.remove();
    const style = document.createElement("style");
    style.id = THEME_STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
    return Promise.resolve();
  }
  let resolved;
  try {
    resolved = new URL(stylesheet, document.baseURI).href;
  } catch {
    console.warn("[TiptapEditor] Invalid stylesheet URL:", stylesheet);
    return Promise.resolve();
  }
  if (existing && existing.tagName === "LINK" && existing.href === resolved && existing.sheet) {
    return Promise.resolve();
  }
  existing?.remove();
  return new Promise((resolve) => {
    const link = document.createElement("link");
    link.id = THEME_STYLE_ID;
    link.rel = "stylesheet";
    link.href = stylesheet;
    link.onload = () => resolve();
    link.onerror = () => {
      console.warn("[TiptapEditor] Failed to load theme stylesheet:", stylesheet);
      resolve();
    };
    document.head.appendChild(link);
  });
}
const Initializer = ({ setPlugin }) => {
  const ref = useRef(setPlugin);
  const { get } = useFetchClient();
  useEffect(() => {
    const fetchTheme = async () => {
      let themeStyles = {};
      try {
        const { data } = await get("/tiptap-editor/theme");
        if (data && typeof data === "object" && Object.keys(data).length > 0) {
          setThemeCache(data);
          if (typeof data.css === "string" && data.css) {
            themeStyles = { css: data.css };
          } else if (typeof data.stylesheet === "string" && data.stylesheet) {
            themeStyles = { stylesheet: data.stylesheet };
          }
        }
      } catch (error) {
        console.warn("[TiptapEditor] Failed to fetch theme config:", error);
      }
      try {
        await reconcileThemeStyles(themeStyles);
      } catch (error) {
        console.warn("[TiptapEditor] Failed to reconcile theme styles:", error);
      } finally {
        ref.current(PLUGIN_ID);
      }
    };
    fetchTheme();
  }, []);
  return null;
};
function PresetSelect({ value, onChange, name }) {
  const { formatMessage } = useIntl();
  const { get } = useFetchClient();
  const [presets, setPresets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    get("/tiptap-editor/presets").then((res) => setPresets(res.data?.presets ?? [])).catch(() => setPresets([])).finally(() => setIsLoading(false));
  }, [get]);
  return /* @__PURE__ */ jsx(
    SingleSelect,
    {
      name,
      value: value || "",
      onChange: (val) => {
        onChange({ target: { name, value: String(val), type: "select" } });
      },
      placeholder: presets.length === 0 ? formatMessage({ id: "tiptap-editor.preset.noPresetsAvailable", defaultMessage: "No presets available" }) : formatMessage({ id: "tiptap-editor.preset.selectPreset", defaultMessage: "Select a preset" }),
      disabled: isLoading || presets.length === 0,
      children: presets.map((presetName) => /* @__PURE__ */ jsx(SingleSelectOption, { value: presetName, children: presetName }, presetName))
    }
  );
}
let appRef = null;
function captureApp(app) {
  appRef = app;
}
function getMediaLibraryComponent() {
  return appRef?.library?.components?.["media-library"] ?? null;
}
const RICH_TEXT_FIELD_NAME = "RichText";
const richTextField = {
  name: RICH_TEXT_FIELD_NAME,
  pluginId: PLUGIN_ID,
  type: "string",
  intlLabel: {
    id: "tiptap-editor.richText.label",
    defaultMessage: "Rich Text (Tiptap)"
  },
  intlDescription: {
    id: "tiptap-editor.richText.description",
    defaultMessage: "Use this field to create formatted text via Tiptap editor."
  },
  icon: Paragraph,
  components: {
    Input: async () => import("./RichTextInput-BHZt0GNd.mjs").then((m) => ({ default: m.default }))
  },
  options: {
    advanced: [
      {
        sectionTitle: {
          id: "tiptap-editor.section.preset.label",
          defaultMessage: "Preset"
        },
        items: [
          {
            name: "options.preset",
            type: "preset-select",
            intlLabel: {
              id: "tiptap-editor.preset.label",
              defaultMessage: "Editor Preset"
            },
            description: {
              id: "tiptap-editor.preset.description",
              defaultMessage: "Select the preset that configures available editing tools."
            }
          }
        ]
      }
    ]
  }
};
const index = {
  register(app) {
    captureApp(app);
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID
    });
    app.customFields.register(
      richTextField
    );
  },
  async bootstrap(app) {
    const ctbPlugin = app.getPlugin("content-type-builder");
    const components = ctbPlugin?.apis?.forms?.components;
    if (components && typeof components.add === "function") {
      components.add({
        id: "preset-select",
        component: PresetSelect
      });
    }
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => import("./en-HTqMhvt6.mjs") }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  }
};
export {
  getThemeCache as a,
  getMediaLibraryComponent as g,
  index as i
};
