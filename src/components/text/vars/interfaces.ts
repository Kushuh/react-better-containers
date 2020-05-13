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
    children?: React.ReactNode;
    placeholderOptions?: PlaceholderOptions;
    [x: string]: any;
}

interface TextState {
    fontFaceReady: boolean;
    ref?: React.RefObject<HTMLInputElement>;
}

export {SpannerProps, TextProps, TextState};