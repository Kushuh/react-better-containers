import React, {CSSProperties} from 'react';
import css from './Text.module.css';
import Spanner from './Spanner';
import {loadFonts} from 'kushuh-react-utils';

interface PlaceholderOptions {
    color?: string;
    linesHeight?: number;
}

interface TextProps {
    placeholder?: 'lines' | 'blurry' | 'none';
    tag?: keyof JSX.IntrinsicElements;
    className?: string;
    style?: CSSProperties;
    placeholderOptions?: PlaceholderOptions;
    innerRef?:  ((instance: any) => void) | React.MutableRefObject<any> | null;
    forcePlaceholder?: boolean;
    [s: string]: any;
}

interface TextState {
    fontFaceReady: boolean;
}

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
        case 'none':
            return '';
        default:
            return css.lines;
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
        if (!this.ref) return;

        const {current} = this.ref;
        if (current) {
            loadFonts(current as HTMLElement)
                .catch(console.error)
                .finally(() => this.setState({fontFaceReady: true}));
        }
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
            forcePlaceholder,
            ...props
        } = this.props;

        /**
         * Default tag is <p/>.
         */
        const Tag: string = tag || 'p';

        if (!['input', 'textarea'].includes(tag)) {
            if (
                (placeholder === 'lines' || placeholder == null) &&
                (!fontFaceReady || forcePlaceholder)
            ) {
                children = [
                    // @ts-ignore
                    <Spanner key={0} children={children} spannerClass={css.linesElement}/>,
                    <span className='placeholder' key={-1}/>
                ];
            }
        } else {
            children = null;
        }

        const tClassName = `
                ${className} 
                ${fontFaceReady && !forcePlaceholder ? '' : getClassNameFromPlaceholder(placeholder)}
            `;

        const tStyle = Object.assign(
            {...style || {}},
            {
                '--placeholder-color': (placeholderOptions || {}).color || (style || {}).color,
                '--better-containers-lines-height': `${(placeholderOptions || {}).linesHeight || 0.4}em`
            }
        );

        const tRef = typeof this.props.innerRef === 'function' ?
            node => {
                // @ts-ignore
                innerRef(node);
                this.ref = {current: node};
            } : this.ref;

        /**
         * React.createElement avoids some Typescript parsing errors (since component tag is a variable).
         *
         * Adds a placeholder className while font isn't loaded. This class is then removed. Transitions should be
         * handled by the user parent class.
         *
         * --placeholder-color takes the current text color by default (with inherit value). It can be overridden by
         * props or local style.
         */
        return <Tag
            // @ts-ignore
            className={tClassName}
            style={tStyle}
            ref={tRef}
            children={children}
            {...props}
        />;
    }
}

/**
 * Keep parent ref consistent, if any.
 */
export default (
    React.forwardRef(
        (
            props: TextProps,
            ref: ((instance: any) => void) | React.MutableRefObject<any> | null | undefined
        ) => <Text innerRef={ref} {...props}/>
    )
);