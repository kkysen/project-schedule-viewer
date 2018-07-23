import {ReactElement} from "react";
import {createElement} from "react-faux-dom";
import {ElementByTag, ElementTag} from "../../ElementTags";
import {Range} from "../../Range";
import {FauxElement} from "./FauxElement";

export interface FauxComponent<Real extends Element> {
    
    readonly element: Real;
    
    readonly render: () => ReactElement<any>;
    
}

export interface FauxComponentClass {
    
    "new"<K extends ElementTag>(tagName: K): FauxComponent<ElementByTag<K>>;
    
}

export const FauxComponent: FauxComponentClass = {
    
    new<K extends ElementTag>(tagName: K): FauxComponent<ElementByTag<K>> {
        // const element = createElement(tagName);
        // return {
        //     element,
        //     render: () => {
        //         return Range.new(1000)
        //             .map(() => element.toReact())
        //             .random();
        //         // return element.toReact();
        //     }
        // };
        const element = FauxElement.new(tagName);
        return {
            element,
            render: () => {
                return Range.new(1)
                    .map(() => element.render())
                    .random();
            },
        };
    },
    
};