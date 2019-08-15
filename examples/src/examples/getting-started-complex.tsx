import React from 'react';
import { createStateLink, useStateLink, useStateLinkUnmounted, StateLink } from '@hookstate/core';

const store = createStateLink([{ counter: 0 }, { counter: 0 }, { counter: 0 }]);

setInterval(() => useStateLinkUnmounted(store)
    .nested[0] // get to the state of the first array element
    .nested.counter // get to the state of the element's counter
    .set(p => p + 1) // increment the counter...
, 3000) // ...every 3 seconds

export const ExampleComponent = () => {
    // type annotations are only to demonstrate how 'nested'
    // types are unfolder when the state tree is traversed
    const state = useStateLink(store);
    return <>{
        state.nested.map((elementState, elementIndex) =>
            <p key={elementIndex}>
                <span>
                    <b>Counter #{elementIndex} value: {elementState.value.counter}</b>
                    {elementIndex === 0 && ' watch +1 every 3 seconds '}
                </span>
                <button
                    onClick={() => elementState.nested.counter.set(p => p + 1)}
                >Increment
                </button>
            </p>
        )
    }</>
}