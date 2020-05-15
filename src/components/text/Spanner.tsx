import React from 'react';
import errors from './vars/errors';
import {SpannerProps} from './typings/typings';
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
                    char => props.ignore != null && props.ignore.includes(char) ?
                        char :
                        <span className={props.spannerClass || 'spanned'} children={char}/>
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
const Spanner: (props: SpannerProps) => Array<Exclude<any[] | any | null, boolean | null | undefined>> | null | undefined =
    (props: SpannerProps) => {
        return React.Children.map(
            props.children,
            c => mapper(c, props)
        );
    };

export default Spanner;