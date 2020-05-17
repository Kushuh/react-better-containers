import React from 'react';
import errors from './vars/errors';
import {addPropsToChildren} from 'kushuh-react-utils';

interface SpannerProps {
    ignore?: Array<string>;
    spannerClass?: string;
    children?: React.ReactNode | React.ReactNodeArray;
}

/**
 * Default mapper.
 *
 * @param childNode
 * @param props
 * @param index
 */
const mapper = (childNode: React.ReactNode, props: SpannerProps, index: string) => {
        /**
         * Since null is a valid React Node, we remove it from spanned content.
         */
        if (childNode != null) {
            if (typeof childNode === 'number' || typeof childNode === 'string') {
                return childNode.toString().split('').map(
                    (char, i) => (props.ignore || []).includes(char) ?
                        char :
                        <span key={`${index}-${i}`} className={props.spannerClass || 'spanned'} children={char}/>
                );
            } else if (React.isValidElement(childNode)) {
                /**
                 * Recursive call to keep complex DOM structures
                 */
                return addPropsToChildren(
                    childNode,
                    ({children, ...props}) => ({
                        children: React.Children.map(children, (c, i) => mapper(c, props, `${index}-${i}`)),
                        ...props
                    })
                );
            } else {
                throw new Error(errors.notValidChildren(childNode));
            }
        } else {
            return null;
        }
    };

/**
 * Wraps each visible character of an element in a special span container, while keeping complex DOM structures.
 */
const Spanner: (props: SpannerProps) => React.ReactNode =
    (props: SpannerProps) => React.Children.map(
        props.children,
        (c, index) => mapper(c, props, `${index}`)
    );

export default Spanner;