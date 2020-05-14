import * as React from 'react';

interface SpannerProps {
    separators?: Array<string>;
    spannerClass?: string;
    children?: React.ReactNode | React.ReactNodeArray;
}

interface PlaceholderOptions {
    color?: string;
}

interface TextProps {
    placeholder?: 'lines' | 'blurry';
    tag?: string;
    children?: React.ReactNode | React.ReactNodeArray;
    className?: string;
    style?: Record<string, any>;
    placeholderOptions?: PlaceholderOptions;
    innerRef?: ((instance: unknown) => void) | React.MutableRefObject<unknown>;
    [x: string]: any;
}

interface TextState {
    fontFaceReady: boolean;
}

export {SpannerProps, TextProps, TextState};