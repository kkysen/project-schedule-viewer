import {ReactElement} from "react";
import {createElement} from "react-faux-dom";
import {ElementByTag, ElementTag, ElementTagNameMap} from "../../ElementTags";

export interface FauxElement<Real extends Element> {
    
    readonly element: Real;
    
    readonly render: () => ReactElement<any>;
    
}

export interface FauxElementClass {
    
    "new"<K extends ElementTag>(tagName: K): FauxElement<ElementByTag<K>>;
    
}

export const FauxElement: FauxElementClass = {
    
    new<K extends ElementTag>(tagName: K): FauxElement<ElementByTag<K>> {
        const element = createElement(tagName);
        return {
            element,
            render: () => element.toReact(),
        };
    },
    
};