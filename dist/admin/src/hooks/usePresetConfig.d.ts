import { TiptapPresetConfig } from '../../../shared/types';
export type PresetConfigResult = {
    config: TiptapPresetConfig | null;
    isLoading: boolean;
};
export declare function usePresetConfig(presetName?: string): PresetConfigResult;
