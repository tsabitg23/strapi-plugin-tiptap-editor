import { ReactNode } from 'react';
import { TiptapPresetConfig } from '../../../shared/types';
interface FeatureGuardProps {
    /** The feature config value from TiptapPresetConfig (e.g., config.bold, config.heading) */
    featureValue: TiptapPresetConfig[keyof TiptapPresetConfig];
    children: ReactNode;
}
/**
 * Conditionally renders children based on whether a feature is enabled in the preset config.
 * When disabled, returns null — children never mount, so any hooks inside are never called.
 * Hooks inside children don't need internal config gating
 * because FeatureGuard prevents them from being called entirely.
 */
export declare function FeatureGuard({ featureValue, children }: FeatureGuardProps): ReactNode;
export {};
