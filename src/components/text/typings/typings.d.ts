import * as React from 'react';

interface SpannerProps {
    ignore?: Array<string>;
    spannerClass?: string;
    children?: React.ReactNode | React.ReactNodeArray;
}

interface PlaceholderOptions {
    color?: string;
    linesHeight?: number;
}

interface TextProps {
    placeholder?: 'lines' | 'blurry' | 'none';
    tag?: string;
    className?: string;
    style?: Record<string, any>;
    placeholderOptions?: PlaceholderOptions;
    innerRef?:  ((instance: any) => void) | React.MutableRefObject<any> | null;
    forcePlaceholder?: boolean;
    [s: string]: any;
}

interface TextState {
    fontFaceReady: boolean;
}

export type {SpannerProps, TextProps, TextState};