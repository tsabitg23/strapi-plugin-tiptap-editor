interface PresetSelectProps {
    value?: string;
    onChange: (payload: {
        target: {
            name: string;
            value: string;
            type?: string;
        };
    }) => void;
    name: string;
    intlLabel?: {
        id: string;
        defaultMessage: string;
    };
    description?: {
        id: string;
        defaultMessage: string;
    };
}
export declare function PresetSelect({ value, onChange, name }: PresetSelectProps): import("react/jsx-runtime").JSX.Element;
export {};
