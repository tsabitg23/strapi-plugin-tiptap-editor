import { ComponentType } from 'react';
export declare const richTextField: {
    readonly name: "RichText";
    readonly pluginId: "tiptap-editor";
    readonly type: "string";
    readonly intlLabel: {
        readonly id: "tiptap-editor.richText.label";
        readonly defaultMessage: "Rich Text (Tiptap)";
    };
    readonly intlDescription: {
        readonly id: "tiptap-editor.richText.description";
        readonly defaultMessage: "Use this field to create formatted text via Tiptap editor.";
    };
    readonly icon: ComponentType<any>;
    readonly components: {
        readonly Input: () => Promise<{
            default: import('react').ForwardRefExoticComponent<(import('../utils/tiptapUtils').TiptapInputProps & {
                attribute?: {
                    options?: {
                        preset?: string;
                    };
                };
            }) & import('react').RefAttributes<HTMLDivElement>>;
        }>;
    };
    readonly options: {
        readonly advanced: readonly [{
            readonly sectionTitle: {
                readonly id: "tiptap-editor.section.preset.label";
                readonly defaultMessage: "Preset";
            };
            readonly items: readonly [{
                readonly name: "options.preset";
                readonly type: "preset-select";
                readonly intlLabel: {
                    readonly id: "tiptap-editor.preset.label";
                    readonly defaultMessage: "Editor Preset";
                };
                readonly description: {
                    readonly id: "tiptap-editor.preset.description";
                    readonly defaultMessage: "Select the preset that configures available editing tools.";
                };
            }];
        }];
    };
};
