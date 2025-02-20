import React, {useContext} from "react";
import {NameContext, AgeContext} from "./App"

function Child3() {
    return (
        <>
            <p>Child1: This is the first child components</p>
            <Child3 />  
        </>
    )
}

export default Child3;