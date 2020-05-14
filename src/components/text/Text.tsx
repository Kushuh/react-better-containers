import React from 'react';
import {TextProps, TextState} from './vars/interfaces';
import css from './Text.module.css';
import Spanner from './Spanner';

/**
 * Hide the text with placeholders while font is loading (optional).
 *
 * @param placeholder
 */
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
        fontFaceReady: false
    };

    /**
     * Init the ref for our component.
     */
    ref: React.MutableRefObject<unknown> = typeof this.props.innerRef === 'function' ?
        React.createRef() :
        this.props.innerRef || React.createRef();

    componentDidMount() {
        const {current} = this.ref;

    }

    render() {
        const {fontFaceReady} = this.state;
        let {
            tag,
            style,
            placeholderOptions,
            placeholder,
            className,
            children,
            innerRef,
            ...props
        } = this.props;

        /**
         * Default tag is <p/>.
         */
        tag = tag || 'p';

        /**
         * React.createElement avoids some Typescript parsing errors (since component tag is a variable).
         *
         * Adds a placeholder className while font isn't loaded. This class is then removed. Transitions should be
         * handled by the user parent class.
         *
         * --placeholder-color takes the current text color by default (with inherit value). It can be overridden by
         * props or local style.
         */
        return React.createElement(
            tag,
            {
                className: `${className} ${fontFaceReady ? '' : getClassNameFromPlaceholder(placeholder)}`,
                style: Object.assign(style, {
                    '--placeholder-color': placeholderOptions.color || style.color
                }),
                ref: typeof this.props.innerRef === 'function' ?
                    node => {
                        // @ts-ignore
                        innerRef(node);
                        this.ref = {current: node};
                    } : this.ref,
                ...props
            },
            placeholder === 'lines' ?
                Spanner({children, spannerClass: css.linesElement}) :
                children
        );
    }
}

/**
 * Keep parent ref consistent, if any.
 */
export default React.forwardRef((props, ref) => <Text innerRef={ref} {...props}/>);