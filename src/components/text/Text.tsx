import React from 'react';
import {TextProps, TextState} from './vars/interfaces';
import css from './Text.module.css';

const getClassNameFromPlaceholder: (p) => string = (placeholder: string | null) => {
    switch (placeholder) {
        case 'lines':
            return css.lines;
        case 'blurry':
            return css.blurry;
        default:
            return '';
    }
}

class Text extends React.Component<TextProps, TextState> {
    state: TextState = {
        fontFaceReady: false,
        ref: null
    };

    render() {
        const {fontFaceReady, ref} = this.state;
        let {
            tag: Tag,
            style,
            placeholderOptions,
            placeholder,
            className,
            ...props
        } = this.props;
        Tag = Tag || 'p';

        return <Tag
            className={`${className} ${fontFaceReady ? '' : getClassNameFromPlaceholder(placeholder)}`}
            style={Object.assign(style, {
                '--placeholder-color': placeholderOptions.color
            })}
            {...props}
        />;
    }
}

export default Text;