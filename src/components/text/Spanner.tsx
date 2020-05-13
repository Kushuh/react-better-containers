import React from 'react';
import errors from './vars/errors';
import {SpannerProps} from './vars/interfaces';
import {addPropsToChildren} from 'kushuh-react-utils';

/**
 * Default mapper.
 *
 * @param childNode
 * @param props
 */
const mapper = (
    childNode: React.ReactNode,
    props: SpannerProps
) => {
        /**
         * Since null is a valid React Node, we remove it from spanned content.
         */
        if (childNode != null) {
            if (typeof childNode === 'number' || typeof childNode === 'string') {
                return childNode.toString().split('').map(
                    char => props.separators != null && props.separators.includes(char) ?
                        char :
                        <span className={props.spannerClass || 'spanner'} children={char}/>
                );
            } else if (React.isValidElement(childNode)) {
                /**
                 * Recursive call to keep complex DOM structures
                 */
                return addPropsToChildren(
                    childNode,
                    ({children, ...props}) => ({
                        children: React.Children.map(children, c => mapper(c, props)),
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
const Spanner = (props: SpannerProps) => {
    return React.Children.map(
        props.children,
        c => mapper(c, props)
    );
};

export default Spanner;